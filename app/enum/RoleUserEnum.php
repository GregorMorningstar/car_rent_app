<?php

namespace App\Enum;

enum RoleUserEnum: string
{
    case ADMIN = 'admin';
    case MODERATOR = 'moderator';
    case USER = 'user';

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::MODERATOR => 'Moderator',
            self::USER => 'User',
        };
    }

    public static function make(string $value): ?self
    {
        return self::tryFrom($value);
    }
}