import AdminLayout from "@/layouts/AdminLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BlogCategoryEdit() {
  const { props } = usePage<{ category: { id: number; name: string } }>();
  const category = (props as any).category;
  const { data, setData, put, processing, errors } = useForm<{ name: string }>({
    name: category?.name || "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/admin/post-categories/${category.id}` as any);
  };

  return (
    <AdminLayout>
      <div className="min-h-[70vh] w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Edytuj kategorię</CardTitle>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nazwa</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Wpisz nazwę kategorii"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-between gap-2 mt-4 pt-2">
              <Link href="/admin/post-categories" className="inline-flex">
                <Button type="button" variant="outline" className="px-7 py-3">Wróć</Button>
              </Link>
              <Button type="submit" disabled={processing} className="px-7 py-3">Zapisz</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
