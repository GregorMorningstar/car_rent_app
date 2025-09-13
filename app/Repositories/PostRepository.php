<?php

namespace App\Repositories;

use App\Models\Post;
use App\Interfaces\PostRepositoryInterface;

class PostRepository implements PostRepositoryInterface
{

protected $model;
public function __construct(Post $post)
    {
        $this->model = $post;
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
}
