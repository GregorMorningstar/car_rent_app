import AdminLayout from "@/layouts/AdminLayout";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import CreateBlogCategory from "@/components/create-post-category";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
type Category = { id: number; name: string; created_at?: string | null };

export default function BlogCategories() {
  const { props } = usePage<{ categories: Category[]; flash?: any; errors?: any }>();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const categories = (props as any).categories as Category[] | undefined;

  type SortKey = 'id' | 'name' | 'created_at';
  type SortDir = 'asc' | 'desc';

  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [query, setQuery] = useState<string>('');

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    const list = Array.isArray(categories) ? [...categories] : [];
    list.sort((a, b) => {
      let av: number | string = '';
      let bv: number | string = '';
      if (sortKey === 'id') {
        av = a.id;
        bv = b.id;
      } else if (sortKey === 'name') {
        av = (a.name || '').toLowerCase();
        bv = (b.name || '').toLowerCase();
      } else if (sortKey === 'created_at') {
        av = a.created_at ? new Date(a.created_at).getTime() : 0;
        bv = b.created_at ? new Date(b.created_at).getTime() : 0;
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [categories, sortKey, sortDir]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((c) => (c.name || '').toLowerCase().includes(q));
  }, [sorted, query]);

  const PAGE_SIZE = 10;
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil((filtered?.length || 0) / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return (filtered || []).slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  const onDelete = async (id: number) => {
    if (!confirm('Na pewno usunąć kategorię?')) return;
    try {
      setDeletingId(id);
      router.delete(`/admin/post-categories/${id}`, {
        onFinish: () => setDeletingId(null),
        preserveScroll: true,
      });
    } catch (e) {
      setDeletingId(null);
    }
  };

  const [isEditOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const { data, setData, put, processing, errors, reset } = useForm<{ name: string }>({ name: "" });

  const onEdit = (c: Category) => {
    setEditing(c);
    setData('name', c.name || '');
    setEditOpen(true);
  };

  const submitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    put(`/admin/post-categories/${editing.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setEditOpen(false);
      },
    });
  };
  return (
    <AdminLayout>
      <div className="p-4">
  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold">Kategorie postów</h1>
                     <CreateBlogCategory />

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                placeholder="Szukaj po nazwie..."
                className="pl-8 w-full md:w-80"
              />
            </div>

          </div>
        </div>
  <Card className="mt-2">
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
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
                      <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:opacity-80">
                        Nazwa
                        <span className="text-[10px]">{sortKey === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</span>
                      </button>
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                      <button onClick={() => toggleSort('created_at')} className="flex items-center gap-1 hover:opacity-80">
                        Data utworzenia
                        <span className="text-[10px]">{sortKey === 'created_at' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</span>
                      </button>
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Akcje</th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border/80">
                  {Array.isArray(paged) && paged.length > 0 ? (
                    paged.map((c) => (
                      <tr key={c.id}>
                        <td className="px-4 py-2 text-sm">{c.id}</td>
                        <td className="px-4 py-2 text-sm">{c.name}</td>
                        <td className="px-4 py-2 text-sm">{c.created_at ? new Date(c.created_at).toLocaleString('pl-PL') : '-'}</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => onEdit(c)}>
                              <Pencil className="size-4" />
                              Edytuj
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDelete(c.id)}
                              disabled={deletingId === c.id}
                            >
                              <Trash2 className="size-4" />
                              Usuń
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-sm text-muted-foreground">
                        Brak kategorii.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Strona {page} z {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={prev} disabled={page === 1}>
                    Poprzednia
                  </Button>
                  <Button variant="outline" size="sm" onClick={next} disabled={page === totalPages}>
                    Następna
                  </Button>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edytuj kategorię</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nazwa</Label>
              <Input
                id="edit-name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                aria-invalid={!!errors.name}
                placeholder="Wpisz nazwę kategorii"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
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

