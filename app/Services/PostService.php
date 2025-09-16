<?php

namespace App\Services;

use App\Interfaces\PostRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Post;
use App\Models\PostCategory;

class PostService
{
    public function __construct(private PostRepositoryInterface $repository) {}

    // ----------------------
    // Legacy (Posts)
    // ----------------------
    public function all()
    {
        return $this->repository->all();
    }

    public function find($id)
    {
        return $this->repository->find($id);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }

    // ----------------------
    // Categories – legacy alias
    // ----------------------
    public function getAllPostCategories(): Collection
    {
        return $this->repository->getAllPostCategories();
    }

    // legacy createPost removed; use typed createPost() below

    /**
     * Zwraca wszystkie posty z relacją user, posortowane od najnowszych.
     */
    // ----------------------
    // Posts – explicit
    // ----------------------
    public function getAllPosts(): Collection
    {
        return $this->repository->getAllPosts();
    }

    public function getPaginatedPosts(int $perPage = 10): LengthAwarePaginator
    {
        return $this->repository->paginatePosts($perPage);
    }

    public function findPost(int $id): ?Post
    {
        return $this->repository->findPost($id);
    }

    public function createPost(array $data): Post
    {
        return $this->repository->createPost($data);
    }

    public function updatePost(int $id, array $data): bool
    {
        return $this->repository->updatePost($id, $data);
    }

    public function deletePost(int $id): bool
    {
        return $this->repository->deletePost($id);
    }

    // ----------------------
    // Categories – explicit
    // ----------------------
    public function allCategories(): Collection
    {
        return $this->repository->allCategories();
    }

    public function getPaginatedCategories(int $perPage = 10): LengthAwarePaginator
    {
        return $this->repository->paginateCategories($perPage);
    }

    public function findCategory(int $id): ?PostCategory
    {
        return $this->repository->findCategory($id);
    }

    public function createCategory(array $data): PostCategory
    {
        return $this->repository->createCategory($data);
    }

    public function updateCategory(int $id, array $data): bool
    {
        return $this->repository->updateCategory($id, $data);
    }

    public function deleteCategory(int $id): bool
    {
        return $this->repository->deleteCategory($id);
    }
}
