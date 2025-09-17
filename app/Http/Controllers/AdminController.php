<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\CarService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Car;
use Illuminate\Support\Str;

class AdminController extends Controller
{
protected CarService $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }


    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function createCar()
    {
        return Inertia::render('Admin/Cars/create-car');
    }

     public function indexCars()
    {
        // pobranie samochodów (paginacja domyślnie 10 – zmień według potrzeby)
        $cars = $this->carService->paginate(10);

        return Inertia::render('Admin/Cars/Index', [
            'cars' => $cars,
        ]);
    }

    public function storeCar(Request $request)
    {
        $validated = $request->validate([
            'registration_number' => 'required|string|max:50',
            'vin' => 'required|string|max:50',
            'production_date' => 'nullable|date',
            'brand' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'color' => 'nullable|string|max:50',
            'mileage' => 'nullable|integer',
            'fuel_type' => 'nullable|string|max:30',
            'power' => 'nullable|integer',
            'seats' => 'nullable|integer',
            'doors' => 'nullable|integer',
            'price_per_day' => 'required|numeric',
            'description' => 'nullable|string',
            'main_image' => 'nullable|image|max:2048',
        ]);

        if (!empty($validated['main_image'])) {
            $file = $validated['main_image'];
            $targetDir = public_path('images/cars/primary');
            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0755, true);
            }
            $ext = strtolower($file->getClientOriginalExtension());
            $filename = uniqid('car_') . '_' . time() . '.' . $ext;
            $file->move($targetDir, $filename);

            // Ścieżka dostępna publicznie (frontend oczekuje działającego /images/...)
            $validated['image_path'] = '/images/cars/primary/' . $filename;
            unset($validated['main_image']);
        }

        // Upewnij się że w modelu Car w $fillable jest 'image_path'
        $this->carService->create($validated);

        return redirect()
            ->route('admin.cars.index')
            ->with('success', 'Samochód został dodany pomyślnie.');
    }

    public function showCar(Car $car)
    {
        return Inertia::render('Admin/Cars/show-car', ['car' => $car]);
    }

    public function editCar(Car $car)
    {
        return Inertia::render('Admin/Cars/edit-car', ['car' => $car]);
    }

    public function updateCar(Request $request, Car $car)
    {
    $validated = $request->all(); // Pobierz wszystkie dane z requestu

        if (!empty($validated['remove_image']) && $car->image_path) {
            $this->deletePublicImage($car->image_path);
            $validated['image_path'] = null;
        }

        if (!empty($validated['main_image'])) {
            // Skasuj stare
            if ($car->image_path) {
                $this->deletePublicImage($car->image_path);
            }
            $file = $validated['main_image'];
            $targetDir = public_path('images/cars/primary');
            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0755, true);
            }
            $ext = strtolower($file->getClientOriginalExtension());
            $filename = uniqid('car_') . '_' . time() . '.' . $ext;
            $file->move($targetDir, $filename);
            $validated['image_path'] = '/images/cars/primary/' . $filename;
        }
        unset($validated['main_image'], $validated['remove_image']);

        $car->update($validated);

        return redirect()
            ->route('admin.cars.edit', $car->id)
            ->with('success', 'Samochód zaktualizowany.');
    }

    public function destroyCar(Car $car)
    {
        if ($car->image_path) {
            $this->deletePublicImage($car->image_path);
        }
        $car->delete();
        return redirect()->route('admin.cars.index')->with('success', 'Samochód usunięty.');
    }

    private function deletePublicImage(string $path): void
    {
        // path like /images/cars/primary/xyz.jpg
        $full = public_path(ltrim($path, '/'));
        if (is_file($full)) @unlink($full);
    }
}
