<?php

namespace App\Repositories;

use App\Models\Post;
use App\Interfaces\PostRepositoryInterface;
use App\Models\PostCategory;
use Illuminate\Support\Collection;

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

    /**
     * Get all posts.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Find a post by ID.
     *
     * @param  int  $id
     * @return Post|null
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create a new post.
     *
     * @param  array  $data
     * @return Post
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Update a post by ID.
     *
     * @param  int    $id
     * @param  array  $data
     * @return bool
     */
    public function update($id, array $data)
    {
        $post = $this->model->find($id);
        if ($post) {
            return $post->update($data);
        }
        return false;
    }

    /**
     * Delete a post by ID.
     *
     * @param  int  $id
     * @return bool|null
     */
    public function delete($id)
    {
        $post = $this->model->find($id);
        if ($post) {
            return $post->delete();
        }
        return false;
    }

    public function getAllPostCategories()
    {
        return $this->postCategoryModel->all();
    }

    /**
     * Get all posts with user information for the blog list.
     */
    public function getAllPosts(): Collection
    {
        return $this->model->newQuery()
            ->with(['user:id,name'])
            ->latest('created_at')
            ->get(); // bez explicit select, unikamy brakujących kolumn
    }
}
