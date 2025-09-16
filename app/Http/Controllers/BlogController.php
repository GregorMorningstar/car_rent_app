<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\PostService;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    /** @var PostService */
    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    // ----------------------
    // Categories (listing)
    // ----------------------
    public function indexCategories()
    {
        $categories = $this->postService->allCategories();
        return Inertia::render('blog/categories', [
            'categories' => $categories
        ]);
    }

    // ----------------------
    // Posts (public index)
    // ----------------------
    public function index()
    {
        $posts = collect($this->postService->getAllPosts())
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title ?? '',
                    'content' => $post->content ?? '',
                    // usunięto slug
                    'meta_title' => $post->meta_title ?? null,
                    'meta_description' => $post->meta_description ?? null,
                    'meta_keywords' => $post->meta_keywords ?? null,
                    'og_image' => $post->og_image ?? null,
                    'canonical_url' => $post->canonical_url ?? null,
                    'image_path' => $post->image_path
                            ? (Str::startsWith($post->image_path, ['http://', 'https://'])
                                ? $post->image_path
                                : ('/storage/' . ltrim($post->image_path, '/')))
                        : null,
                    'user' => $post->user
                        ? ['id' => $post->user->id, 'name' => $post->user->name]
                        : null,
                    'created_at' => optional($post->created_at)->toDateString(),
                ];
            })
            ->values();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    // ----------------------
    // Post (public show)
    // ----------------------
    public function show($id)
    {
        $model = $this->postService->findPost((int) $id);
        if (!$model) {
            abort(404);
        }

        $post = [
            'id' => $model->id,
            'title' => $model->title ?? '',
            'content' => $model->content ?? '',
            'meta_title' => $model->meta_title ?? null,
            'meta_description' => $model->meta_description ?? null,
            'meta_keywords' => $model->meta_keywords ?? null,
            'og_image' => $model->og_image ?? null,
            'canonical_url' => $model->canonical_url ?? null,
            'image_path' => $model->image_path
                ? (Str::startsWith($model->image_path, ['http://', 'https://'])
                    ? $model->image_path
                    : ('/storage/' . ltrim($model->image_path, '/')))
                : null,
            'user' => $model->user
                ? ['id' => $model->user->id, 'name' => $model->user->name]
                : null,
            'created_at' => optional($model->created_at)->toDateString(),
        ];

        return Inertia::render('blog/post', [
            'post' => $post,
        ]);
    }

    // ----------------------
    // Post (admin create)
    // ----------------------
    public function create()
    {
        $categories = $this->postService->allCategories();
        return Inertia::render('blog/create', [
            'categories' => $categories
        ]);
    }

    // ----------------------
    // Post (admin store)
    // ----------------------
    public function storePost(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'category_id' => ['required', 'exists:post_categories,id'],
            // doprecyzowane: akceptowane typy i limit 4 MB
            'image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp,avif,gif', 'max:4096'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:255'],
            'meta_keywords' => ['nullable', 'string', 'max:255'],
        ]);

        $data = $validated;
        $data['post_category_id'] = (int) $validated['category_id'];
        unset($data['category_id']);
        $data['user_id'] = auth()->id();

        try {
            // upload obrazu
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                if (!$file->isValid()) {
                    Log::warning('Invalid image upload', [
                        'error' => method_exists($file, 'getError') ? $file->getError() : null,
                        'clientName' => method_exists($file, 'getClientOriginalName') ? $file->getClientOriginalName() : null,
                    ]);
                    return back()->withErrors(['image' => 'Nie udało się wczytać pliku. Spróbuj ponownie.'])->withInput();
                }

                // zapis na dysku public – Laravel tworzy brakujące katalogi
                $path = $file->store('image/article', 'public');
                if (!$path) {
                    return back()->withErrors(['image' => 'Błąd zapisu pliku na dysku.'])->withInput();
                }

                // normalizacja separartorów ścieżki (Windows)
                $path = str_replace('\\', '/', $path);

                if (!Storage::disk('public')->exists($path)) {
                    Log::error('Image missing after store()', ['path' => $path]);
                    return back()->withErrors(['image' => 'Nie udało się zapisać pliku na dysku.'])->withInput();
                }

                // zapisujemy ścieżkę względną z dysku public (np. image/article/xxx.jpg)
                $data['image_path'] = $path;

                // og:image – absolutny URL do social preview
                $data['og_image'] = $data['og_image'] ?? (request()->getSchemeAndHttpHost() . '/storage/' . ltrim($path, '/'));
            }

            // SEO – czyszczenie i przycięcia
            $plain = $this->cleanMetaText((string) ($data['content'] ?? ''));

            $site = (string) config('app.name', '');
            $metaTitle = $data['meta_title'] ?? $data['title'];
            $suffix = $site ? ' | ' . $site : '';
            $fullTitle = $metaTitle . $suffix;
            $data['meta_title'] = mb_strlen($fullTitle) <= 60 ? $fullTitle : Str::limit($fullTitle, 60, '');

            $data['meta_description'] = $data['meta_description'] ?? $this->smartTrim($plain, 160);

            if (empty($data['meta_keywords'])) {
                $category = $this->postService->findCategory((int) $data['post_category_id']);
                $stop = ['i','oraz','dla','na','po','jak','o','do','z','ze','że','nie','to','a','w','u','od','bez','ale'];
                $titleWords = collect(str_word_count(Str::lower($data['title']), 1, 'ąćęłńóśźż'))
                    ->filter(fn ($w) => mb_strlen($w) >= 3 && !in_array($w, $stop, true))
                    ->unique()->take(8)->values()->all();
                $kw = array_values(array_filter(array_unique(array_merge(
                    $category ? [Str::lower($category->name)] : [],
                    $titleWords
                ))));
                $data['meta_keywords'] = implode(',', $kw);
            }

            unset($data['image']); // nie zapisujemy UploadedFile
            $this->postService->createPost($data);

        } catch (\Throwable $e) {
            Log::error('Błąd podczas tworzenia posta', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return back()->withErrors(['general' => 'Nie udało się zapisać posta.'])->withInput();
        }

        return redirect()->route('admin.blog.create')->with('success', 'Post został utworzony.');
    }

    // ----------------------
    // Category (admin store)
    // ----------------------
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:post_categories,name'],
        ], [
            'name.unique' => 'Taka kategoria już istnieje.',
        ]);

        try {
            $this->postService->createCategory([
                'name' => $data['name'],
            ]);
        } catch (QueryException $e) {
            if (($e->errorInfo[1] ?? null) === 1062) {
                return back()->withErrors(['name' => 'Taka kategoria już istnieje.'])->withInput();
            }
            throw $e;
        }

        return back()->with('success', 'Kategoria została utworzona.');
    }

    // ----------------------
    // Category (admin edit)
    // ----------------------
    public function editCategory(int $id)
    {
        $category = $this->postService->findCategory($id);
        if (!$category) {
            abort(404);
        }

        return Inertia::render('blog/categories_edit', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
            ],
        ]);
    }

    // ----------------------
    // Category (admin update)
    // ----------------------
    public function updateCategory(Request $request, int $id)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:post_categories,name,' . $id],
        ], [
            'name.unique' => 'Taka kategoria już istnieje.',
        ]);

        try {
            $this->postService->updateCategory($id, ['name' => $data['name']]);
        } catch (QueryException $e) {
            if (($e->errorInfo[1] ?? null) === 1062) {
                return back()->withErrors(['name' => 'Taka kategoria już istnieje.'])->withInput();
            }
            throw $e;
        }

        return redirect()->route('admin.post-categories.index')->with('success', 'Kategoria zaktualizowana.');
    }

    // ----------------------
    // Category (admin delete)
    // ----------------------
    public function destroyCategory(int $id)
    {
        try {
            $this->postService->deleteCategory($id);
        } catch (QueryException $e) {
            return back()->withErrors(['name' => 'Nie można usunąć kategorii powiązanej z postami.']);
        }

        return back()->with('success', 'Kategoria została usunięta.');
    }
    // Pomocnicze metody SEO
    private function cleanMetaText(string $text): string
    {
        $t = html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $t = str_replace(['"', '“', '”', '„', '"'], '', $t);
        $t = preg_replace('/\s+/u', ' ', $t);
        return trim($t);
    }
    private function smartTrim(string $text, int $limit = 160): string
    {
        $t = trim($text);
        if (mb_strlen($t) <= $limit) {
            return $t;
        }
        $cut = mb_substr($t, 0, $limit);
        // utnij do ostatniego pełnego słowa/znaku alfanumerycznego
        $cut = rtrim($cut);
        $cut = preg_replace('/[^\p{L}\p{N}]+$/u', '', $cut);
        return $cut;
    }

    //Post Admin Article Actions
    public function indexArticle()
    {
        $posts = collect($this->postService->getAllPosts())
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title ?? '',
                    'content' => $post->content ?? '',
                    // usunięto slug
                    'meta_title' => $post->meta_title ?? null,
                    'meta_description' => $post->meta_description ?? null,
                    'meta_keywords' => $post->meta_keywords ?? null,
                    'og_image' => $post->og_image ?? null,
                    'canonical_url' => $post->canonical_url ?? null,
                    'image_path' => $post->image_path
                            ? (Str::startsWith($post->image_path, ['http://', 'https://'])
                                ? $post->image_path
                                : ('/storage/' . ltrim($post->image_path, '/')))
                        : null,
                    'user' => $post->user
                        ? ['id' => $post->user->id, 'name' => $post->user->name]
                        : null,
                    'created_at' => optional($post->created_at)->toDateString(),
                ];
            })
            ->values();

        return Inertia::render('blog/article_index', [
            'posts' => $posts,
        ]);
    }
}
