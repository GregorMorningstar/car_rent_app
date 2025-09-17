import AdminLayout from "@/layouts/AdminLayout";
import { useMemo, useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, Eye, Search } from "lucide-react";

type Post = {
    id: number;
    title: string;
    content: string;
    image_path?: string | null;
};

type ArticleIndexProps = {
    posts: Post[];
};

export default function ArticleIndex({ posts }: ArticleIndexProps) {
    const PAGE_SIZE = 10;
    const [page, setPage] = useState(1);

    type SortKey = 'id' | 'title';
    type SortDir = 'asc' | 'desc';
    const [sortKey, setSortKey] = useState<SortKey>('id');
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [query, setQuery] = useState('');

    const toggleSort = (key: SortKey) => {
        if (key === sortKey) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const sorted = useMemo(() => {
        const list = Array.isArray(posts) ? [...posts] : [];
        list.sort((a, b) => {
            let av: number | string = '';
            let bv: number | string = '';
            if (sortKey === 'id') {
                av = a.id;
                bv = b.id;
            } else if (sortKey === 'title') {
                av = (a.title || '').toLowerCase();
                bv = (b.title || '').toLowerCase();
            }
            if (av < bv) return sortDir === 'asc' ? -1 : 1;
            if (av > bv) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
        return list;
    }, [posts, sortKey, sortDir]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return sorted;
        return sorted.filter((p) =>
            (p.title || '').toLowerCase().includes(q) ||
            (p.content || '').toLowerCase().includes(q)
        );
    }, [sorted, query]);

    const totalPages = Math.max(1, Math.ceil((filtered?.length || 0) / PAGE_SIZE));
    const paged = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return (filtered || []).slice(start, start + PAGE_SIZE);
    }, [filtered, page]);

    const prev = () => setPage((p) => Math.max(1, p - 1));
    const next = () => setPage((p) => Math.min(totalPages, p + 1));

    const [deletingId, setDeletingId] = useState<number | null>(null);
    const onDelete = async (id: number) => {
        if (!confirm("Na pewno usunąć artykuł?")) return;
        try {
            setDeletingId(id);
            router.delete(`/admin/blog/${id}`, {
                preserveScroll: true,
                onFinish: () => setDeletingId(null),
            });
        } catch (e) {
            setDeletingId(null);
        }
    };

    const [isEditOpen, setEditOpen] = useState(false);
    const [editing, setEditing] = useState<Post | null>(null);
    const { data, setData, processing, errors, reset } = useForm<{ title: string; content: string; image: File | null }>({ title: "", content: "", image: null });

    const onEdit = (p: Post) => {
        setEditing(p);
        setData({ title: p.title || "", content: p.content || "", image: null });
        setEditOpen(true);
    };

    const submitEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editing) return;
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image) formData.append('image', data.image);
        router.post(`/admin/blog/${editing.id}?_method=PUT`, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditOpen(false);
                reset();
            }
        });
    };

    return (
    <AdminLayout>
            <div className="min-h-[70vh] w-full p-4">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl font-bold">Lista artykułów</h1>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                                placeholder="Szukaj po tytule lub fragmencie..."
                                className="pl-8 w-full md:w-80"
                            />
                        </div>
                    </div>
                </div>

                {(filtered?.length || 0) === 0 ? (
                    <p>Brak artykułów do wyświetlenia.</p>
                ) : (
                    <Card>
                        <CardContent>
                            <div className="overflow-x-auto rounded-lg border mt-4">
                                <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-muted/40">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                                                <button onClick={() => toggleSort('id')} className="flex items-center gap-1 hover:opacity-80">
                                                    ID
                                                    <span className="text-[10px]">{sortKey === 'id' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</span>
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                                                <button onClick={() => toggleSort('title')} className="flex items-center gap-1 hover:opacity-80">
                                                    Tytuł
                                                    <span className="text-[10px]">{sortKey === 'title' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</span>
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Fragment</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Akcje</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-background divide-y divide-border/80">
                                        {paged.map((post) => (
                                            <tr key={post.id}>
                                                <td className="px-4 py-2 text-sm">{post.id}</td>
                                                <td className="px-4 py-2 text-sm">{post.title}</td>
                                                <td className="px-4 py-2 text-sm">{post.content.length > 100 ? post.content.slice(0, 100) + '…' : post.content}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/blog/${post.id}`} target="_blank">
                                                                <Eye className="size-4" />
                                                                Podgląd
                                                            </Link>
                                                        </Button>
                                                        <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
                                                            <Pencil className="size-4" />
                                                            Edytuj
                                                        </Button>
                                                        <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)} disabled={deletingId === post.id}>
                                                            <Trash2 className="size-4" />
                                                            Usuń
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <Button variant="outline" size="sm" onClick={prev} disabled={page === 1}>
                                    Poprzednia
                                </Button>
                                <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
                                <Button variant="outline" size="sm" onClick={next} disabled={page === totalPages}>
                                    Następna
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edytuj artykuł</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" htmlFor="title">Tytuł</label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} aria-invalid={!!errors.title} />
                            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" htmlFor="content">Treść</label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full min-h-28 rounded-md border px-3 py-2 text-sm"
                            />
                            {errors.content && <p className="text-sm text-red-600">{errors.content}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium" htmlFor="image">Obraz (opcjonalnie)</label>
                            {editing?.image_path && (
                                <div className="mb-2">
                                    <img src={editing.image_path} alt="Aktualny" className="h-24 w-auto rounded border object-cover" />
                                </div>
                            )}
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setData('image', file);
                                }}
                                className="block w-full text-sm"
                            />
                            {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                        </div>
                        <DialogFooter className="justify-end gap-2">
                            <Button type="submit" disabled={processing} className="px-7 py-3">Zapisz</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
    </AdminLayout>
    );
}
