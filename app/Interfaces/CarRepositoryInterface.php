<?php

namespace App\Interfaces;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use App\Models\Car;

interface CarRepositoryInterface
{
    /**
     * Zwraca kolekcję wszystkich samochodów.
     */
    public function all(): Collection;

    /**
     * Stronicowana lista samochodów.
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Znajdź samochód po ID.
     */
    public function find(int $id): ?Car;

    /**
     * Utwórz nowy samochód.
     * @param array<string,mixed> $data
     */
    public function create(array $data): Car;

    /**
     * Aktualizuj istniejący samochód.
     * @param array<string,mixed> $data
     */
    public function update(int $id, array $data): bool;

    /**
     * Usuń samochód.
     */
    public function delete(int $id): bool;
}
