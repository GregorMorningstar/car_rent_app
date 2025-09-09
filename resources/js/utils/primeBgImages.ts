// Ładuje wszystkie obrazy jako URL-e (bez potrzeby ręcznej listy)
const modules = import.meta.glob(
  '@/../images/background/prime-bg/*.{jpg,jpeg,png,webp}',
  { eager: true, as: 'url' }
);

// modules: { 'path': 'url' }
export const primeBgImages = Object.values(modules) as string[];

export function getRandomPrimeBg() {
  if (!primeBgImages.length) return '';
  return primeBgImages[Math.floor(Math.random() * primeBgImages.length)];
}