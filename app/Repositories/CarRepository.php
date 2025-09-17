<?php

namespace App\Repositories;

use App\Interfaces\CarRepositoryInterface;
use App\Models\Car;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CarRepository implements CarRepositoryInterface
{
    public function __construct(private Car $model)
    {
    }

    public function all(): Collection
    {
        return $this->model->newQuery()->orderByDesc('id')->get();
    }

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->newQuery()
            ->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function find(int $id): ?Car
    {
        return $this->model->find($id);
    }

    public function create(array $data): Car
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $car = $this->model->find($id);
        return $car ? $car->update($data) : false;
    }

    public function delete(int $id): bool
    {
        $car = $this->model->find($id);
        return $car ? (bool) $car->delete() : false;
    }
}
