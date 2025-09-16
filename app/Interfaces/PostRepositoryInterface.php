<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Post;
use App\Models\PostCategory;

interface PostRepositoryInterface
{
    // ----------------------
    // Legacy (Posts) – kept for compatibility
    // ----------------------
    /** @return mixed */
    public function all();

    /** @param mixed $id @return mixed */
    public function find($id);

    public function create(array $data);

    /** @param mixed $id */
    public function update($id, array $data);

    /** @param mixed $id */
    public function delete($id);

    /** @return Collection */
    public function getAllPostCategories();

    public function getAllPosts(): Collection;

    // ----------------------
    // Posts – explicit CRUD + pagination
    // ----------------------
    public function paginatePosts(int $perPage = 10): LengthAwarePaginator;
    public function findPost(int $id): ?Post;
    public function createPost(array $data): Post;
    public function updatePost(int $id, array $data): bool;
    public function deletePost(int $id): bool;

    // ----------------------
    // Categories – CRUD + pagination
    // ----------------------
    public function allCategories(): Collection;
    public function paginateCategories(int $perPage = 10): LengthAwarePaginator;
    public function findCategory(int $id): ?PostCategory;
    public function createCategory(array $data): PostCategory;
    public function updateCategory(int $id, array $data): bool;
    public function deleteCategory(int $id): bool;
}
