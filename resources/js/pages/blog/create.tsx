import React, { useEffect, useMemo, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import CreateBlogCategory from "@/components/create-post-category";

type Category = { id: number; name: string; slug: string };
type Shared = { categories?: Category[]; flash?: { success?: string; error?: string }; auth?: { user?: { id: number } } };

const truncateWords = (text: string, maxWords = 100) => {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text || "";
  return words.slice(0, maxWords).join(" ") + " ...";
};

export default function CreateBlogPost() {
  const { props } = usePage<Shared>();
  const categories = props.categories ?? [];
  const userId = props.auth?.user?.id;

  const form = useForm<{
    category_id: number | "";
    title: string;
    content: string;
    image: File | null;
    user_id?: number;
  }>({
    category_id: "",
    title: "",
    content: "",
    image: null,
  });
  const { data, setData, post, processing, errors, reset } = form;
  form.transform((payload) => ({ ...payload, user_id: userId }));

  const [imagePreview, setImagePreview] = useState<string>("");
  useEffect(() => {
    if (data.image) {
      const url = URL.createObjectURL(data.image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreview("");
  }, [data.image]);

  const previewContent = useMemo(() => truncateWords(data.content, 100), [data.content]);

  const selectedCategoryName = useMemo(() => {
    const id = data.category_id;
    if (!id) return "";
    const found = categories.find((c) => c.id === id);
    return found?.name ?? "";
  }, [categories, data.category_id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/admin/blog", {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <AdminLayout>
      <CreateBlogCategory />
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="category_id">Kategoria</label>
              <select
                id="category_id"
                className="w-full border border-gray-300 p-2 rounded"
                value={data.category_id}
                onChange={(e) => setData("category_id", e.target.value ? Number(e.target.value) : "")}
                required
              >
                <option value="">Wybierz kategorię</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="image">Obrazek</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setData("image", e.target.files?.[0] ?? null)}
              />
              {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="title">Tytuł</label>
              <input
                id="title"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Wpisz tytuł"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                required
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="content">Treść</label>
              <textarea
                id="content"
                className="w-full border border-gray-300 p-2 rounded h-40"
                placeholder="Treść posta"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
                required
              />
              {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-[#F53003] text-white px-4 py-2 rounded hover:bg-[#d72600] disabled:opacity-60"
            >
              {processing ? "Zapisywanie…" : "Utwórz post"}
            </button>
          </form>

          <aside>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="relative">
                {imagePreview ? (
                  <img src={imagePreview} alt={data.title || "Post"} className="w-full h-56 object-cover" />
                ) : (
                  <div className="w-full h-56 bg-gray-100" />
                )}
                {selectedCategoryName && (
                  <span className="absolute bottom-2 left-2 bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded shadow">
                    {selectedCategoryName}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{data.title || "Tytuł posta"}</h2>
                <p className="text-gray-700">
                  {previewContent || "Tutaj pojawi się skrót treści posta."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
