<?php
// app/Http/Middleware/CheckRoleMiddleware.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->guest(route('login'));
        }

        // If roles are specified on the route, enforce them.
        if (!empty($roles)) {
            if (in_array($user->role, $roles, true)) {
                return $next($request);
            }

            // Role mismatch: redirect by actual role instead of aborting.
            return $this->redirectByRole($user->role);
        }

        // No roles specified: if user is admin and not already under /admin, redirect to /admin
        if ($user->role === 'admin' && !$request->is('admin*')) {
            return redirect('/admin');
        }

        return $next($request);
    }

    private function redirectByRole(string $role)
    {
        return match ($role) {
            'admin' => redirect('/admin'),
            'moderator' => redirect('/moderator'),
            default => redirect('/home'),
        };
    }
}
