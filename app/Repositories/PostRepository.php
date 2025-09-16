<?php

namespace App\Repositories;

use App\Models\Post;
use App\Interfaces\PostRepositoryInterface;
use App\Models\PostCategory;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PostRepository implements PostRepositoryInterface
{
    protected $model;
    protected $postCategoryModel;

    /**
     * PostRepository constructor.
     *
     * @param  Post  $post
     * @param  PostCategory  $postCategory
     */
    public function __construct(Post $post, PostCategory $postCategory)
    {
        $this->model = $post;
        $this->postCategoryModel = $postCategory;
    }

    // ----------------------
    // Legacy (Posts)
    // ----------------------
    /** @inheritDoc */
    public function all()
    {
        return $this->model->all();
    }

    /** @inheritDoc */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /** @inheritDoc */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /** @inheritDoc */
    public function update($id, array $data)
    {
        $post = $this->model->find($id);
        if ($post) {
            return $post->update($data);
        }
        return false;
    }

    /** @inheritDoc */
    public function delete($id)
    {
        $post = $this->model->find($id);
        if ($post) {
            return $post->delete();
        }
        return false;
    }

    /** @inheritDoc */
    public function getAllPostCategories()
    {
        return $this->postCategoryModel->newQuery()->orderBy('name')->get();
    }

    // ----------------------
    // Posts – explicit
    // ----------------------
    public function getAllPosts(): Collection
    {
        return $this->model->newQuery()
            ->with(['user:id,name'])
            ->latest('created_at')
            ->get(); // bez explicit select, unikamy brakujących kolumn
    }

    // New explicit Post CRUD + pagination
    public function paginatePosts(int $perPage = 10): LengthAwarePaginator
    {
        return $this->model->newQuery()
            ->with(['user:id,name'])
            ->latest('created_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findPost(int $id): ?Post
    {
        return $this->model->newQuery()->with(['user:id,name'])->find($id);
    }

    public function createPost(array $data): Post
    {
        return $this->model->create($data);
    }

    public function updatePost(int $id, array $data): bool
    {
        $post = $this->model->find($id);
        return $post ? $post->update($data) : false;
    }

    public function deletePost(int $id): bool
    {
        $post = $this->model->find($id);
        return $post ? (bool) $post->delete() : false;
    }

    // ----------------------
    // Categories – explicit
    // ----------------------
    public function allCategories(): Collection
    {
        return $this->postCategoryModel->newQuery()
            ->orderBy('name')
            ->get();
    }

    public function paginateCategories(int $perPage = 10): LengthAwarePaginator
    {
        return $this->postCategoryModel->newQuery()
            ->withCount('posts')
            ->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findCategory(int $id): ?PostCategory
    {
        return $this->postCategoryModel->find($id);
    }

    public function createCategory(array $data): PostCategory
    {
        return $this->postCategoryModel->create($data);
    }

    public function updateCategory(int $id, array $data): bool
    {
        $cat = $this->postCategoryModel->find($id);
        return $cat ? $cat->update($data) : false;
    }

    public function deleteCategory(int $id): bool
    {
        $cat = $this->postCategoryModel->find($id);
        return $cat ? (bool) $cat->delete() : false;
    }
}
