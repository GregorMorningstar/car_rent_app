<?php

namespace App\Services;

use App\Interfaces\PostRepositoryInterface;
use Illuminate\Support\Collection;

class PostService
{
    public function __construct(private PostRepositoryInterface $repository) {}

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

    public function getAllPostCategories(): Collection
    {
        return $this->repository->getAllPostCategories();
    }

    public function createPost(array $data)
    {
        return $this->repository->create($data);
    }

    /**
     * Zwraca wszystkie posty z relacją user, posortowane od najnowszych.
     */
    public function getAllPosts(): Collection
    {
        return $this->repository->getAllPosts(); 
    }
}
