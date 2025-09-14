<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;

interface PostRepositoryInterface
{
    public function all();

    public function find($id);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);

    public function getAllPostCategories();

    public function getAllPosts(): Collection; 
}
