<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CarService;
use Illuminate\Support\Facades\Storage;
use App\Models\Car;
class CarController extends Controller
{
    protected CarService $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    public function index() {
        $cars = Car::all();
        return Inertia::render('cars/Index', [
            'cars' => $cars,
        ]);
    }

    public function adminCarIndex(Request $request)
    {
        $perPage = (int) $request->query('per_page', 5);
        $cars = $this->carService->paginate($perPage);

        return Inertia::render('cars/AdminIndex', [
            'cars' => $cars,
        ]);
    }

    public function create()
    {
        return Inertia::render('cars/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'registration_number' => ['required','string','max:100'],
            'vin' => ['nullable','string','max:100'],
            'production_date' => ['nullable','date'],
            'brand' => ['required','string','max:100'],
            'model' => ['required','string','max:100'],
            'color' => ['nullable','string','max:50'],
            'mileage' => ['nullable','integer'],
            'fuel_type' => ['nullable','string','max:50'],
            'power' => ['nullable','integer'],
            'seats' => ['nullable','integer'],
            'doors' => ['nullable','integer'],
            'price_per_day' => ['required','numeric'],
            'description' => ['nullable','string'],
            'main_image' => ['nullable','image','mimes:jpg,jpeg,png,webp','max:4096'],
        ]);

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('cars/main', 'public');
            $data['image_path'] = str_replace('\\','/',$path);
        }

        unset($data['main_image']);

        $this->carService->create($data);

        return redirect()->route('admin.cars.index')->with('success','Samochód dodany.');
    }

    public function edit(int $id)
    {
        $car = $this->carService->find($id);
        abort_if(!$car, 404);

        return Inertia::render('cars/edit', [
            'car' => $car,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $data = $request->validate([
            'registration_number' => ['required','string','max:100'],
            'vin' => ['nullable','string','max:100'],
            'production_date' => ['nullable','date'],
            'brand' => ['required','string','max:100'],
            'model' => ['required','string','max:100'],
            'color' => ['nullable','string','max:50'],
            'mileage' => ['nullable','integer'],
            'fuel_type' => ['nullable','string','max:50'],
            'power' => ['nullable','integer'],
            'seats' => ['nullable','integer'],
            'doors' => ['nullable','integer'],
            'price_per_day' => ['required','numeric'],
            'description' => ['nullable','string'],
            'main_image' => ['nullable','image','mimes:jpg,jpeg,png,webp','max:4096'],
        ]);

        $car = $this->carService->find($id);
        abort_if(!$car, 404);

        if ($request->hasFile('main_image')) {
            if ($car->image_path && Storage::disk('public')->exists($car->image_path)) {
                Storage::disk('public')->delete($car->image_path);
            }
            $path = $request->file('main_image')->store('cars/main', 'public');
            $data['image_path'] = str_replace('\\','/',$path);
        }

        unset($data['main_image']);

        $this->carService->update($id, $data);

        return redirect()->route('admin.cars.index')->with('success','Samochód zaktualizowany.');
    }

    public function destroy(int $id)
    {
        $car = $this->carService->find($id);
        if ($car && $car->image_path && Storage::disk('public')->exists($car->image_path)) {
            Storage::disk('public')->delete($car->image_path);
        }
        $this->carService->delete($id);

        return back()->with('success','Samochód usunięty.');
    }
}
