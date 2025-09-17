import React from 'react';
import { Link } from '@inertiajs/react';

export type Car = {
  id: number;
  name?: string;
  brand?: string;
  model?: string;
  image_path?: string | null; // ścieżka względna np. storage/cars/xyz.jpg lub /storage/cars/xyz.jpg
  created_at?: string | null;
};

interface CarCardProps {
  car: Car;
  href?: string;              // opcjonalny link do szczegółów
  className?: string;
  placeholderSrc?: string;    // opcjonalny własny placeholder
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  href,
  className = '',
  placeholderSrc = '/images/placeholder-car.jpg',
}) => {
  const title = car.name || [car.brand, car.model].filter(Boolean).join(' ') || `Samochód #${car.id}`;
  // Normalizacja ścieżki obrazu
  let img = car.image_path || '';
  if (img && !img.startsWith('http') && !img.startsWith('/')) {
    img = '/' + img;
  }
  if (!img) img = placeholderSrc;

  const content = (
    <div
      className={`group relative overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md ${className}`}
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={img}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = placeholderSrc;
            }}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2">{title}</h3>
        <p className="mt-1 text-[11px] text-muted-foreground">
          ID: {car.id}
          {car.created_at && (
            <span> • {new Date(car.created_at).toLocaleDateString('pl-PL')}</span>
          )}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        {content}
      </Link>
    );
  }
  return content;
};

export default CarCard;
