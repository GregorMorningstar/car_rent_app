<?php

namespace App\Enum;

enum CarRentalsStatusEnum: string
{
    case RESERVED = 'reserved'; // zarezerwowany
    case ACTIVE = 'active'; // aktywny (w trakcie wynajmu)
    case COMPLETED = 'completed'; // zakończony
    case CANCELLED = 'cancelled'; // anulowany
    case OVERDUE = 'overdue'; // przeterminowany
    case PENDING_PAYMENT = 'pending_payment'; // oczekuje na płatność
    case PAID = 'paid'; // opłacony

    public function label(): string
    {
        return match($this) {
            self::RESERVED => 'Zarezerwowany',
            self::ACTIVE => 'Aktywny',
            self::COMPLETED => 'Zakończony',
            self::CANCELLED => 'Anulowany',
            self::OVERDUE => 'Przeterminowany',
            self::PENDING_PAYMENT => 'Oczekuje na płatność',
            self::PAID => 'Opłacony',
        };
    }

    public static function make(string $value): self
    {
        return match($value) {
            'reserved' => self::RESERVED,
            'active' => self::ACTIVE,
            'completed' => self::COMPLETED,
            'cancelled' => self::CANCELLED,
            'overdue' => self::OVERDUE,
            'pending_payment' => self::PENDING_PAYMENT,
            'paid' => self::PAID,
            default => throw new \InvalidArgumentException('Nieznany status wynajmu: ' . $value),
        };
    }
}