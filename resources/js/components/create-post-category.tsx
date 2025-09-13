import React from 'react';
import { useForm } from '@inertiajs/react';

export default function CreatePostCategory() {
  const { data, setData, post, processing, errors, reset } = useForm<{ name: string }>({
    name: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/post-categories', {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="max-w-3xl mr-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post Category</h1>
      <form onSubmit={onSubmit} className="flex items-center gap-3">
        <label htmlFor="name" className="sr-only">
          Category name
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="Category name"
          className="flex-1 min-w-0 rounded border px-3 py-2"
          aria-invalid={!!errors.name}
        />
        <button
          type="submit"
          disabled={processing}
          className="whitespace-nowrap rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-60"
        >
          Create
        </button>
        {errors.name && <span className="ml-2 text-sm text-red-600">{errors.name}</span>}
      </form>
    </div>
  );
}
