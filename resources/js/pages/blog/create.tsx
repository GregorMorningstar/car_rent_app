import CreatePostCategory from "@/components/create-post-category";
import AdminLayout from "@/layouts/AdminLayout";

export default function CreateBlogPost() {
  return (
  <AdminLayout>
    
    <CreatePostCategory />
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter post title"
            required
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            className="w-full border border-gray-300 p-2 rounded h-40"
            placeholder="Enter post body"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="meta_title">
            Meta Title
          </label>
          <input
            type="text"
            id="meta_title"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter meta title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="meta_description">
            Meta Description
          </label>
          <textarea
            id="meta_description"
            className="w-full border border-gray-300 p-2 rounded h-20"
            placeholder="Enter meta description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="meta_keywords">
            Meta Keywords
          </label>
          <input
            type="text"
            id="meta_keywords"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter meta keywords (comma separated)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="canonical_url">
            Canonical URL
          </label>
          <input
            type="url"
            id="canonical_url"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter canonical URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image_path">
            Image URL
          </label>
          <input
            type="url"
            id="image_path"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  </AdminLayout>
  );
}
