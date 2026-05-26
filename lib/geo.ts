export const TUNISIAN_CITIES = [
  "Tunis", "Ariana", "La Marsa", "Sfax", "Sousse", "Nabeul",
  "Bizerte", "Monastir", "Kairouan", "Hammamet", "Gabès",
  "Gafsa", "Médenine", "Zarzis", "Djerba",
];

// Approximate road distances (km) between cities in mock data + neighbours
const DISTANCES: Record<string, Record<string, number>> = {
  "Tunis": {
    "Tunis": 0, "Ariana": 8, "La Marsa": 18, "Université de Carthage": 15,
    "Bizerte": 66, "Nabeul": 65, "Hammamet": 60,
    "Sousse": 145, "Monastir": 162, "Kairouan": 156,
    "Sfax": 270, "Gabès": 398, "Gafsa": 345,
    "Médenine": 510, "Zarzis": 555, "Djerba": 530,
  },
  "Ariana": {
    "Tunis": 8, "Ariana": 0, "La Marsa": 10, "Université de Carthage": 12,
    "Bizerte": 74, "Nabeul": 72, "Hammamet": 67,
    "Sousse": 153, "Monastir": 170, "Kairouan": 162, "Sfax": 278,
  },
  "La Marsa": {
    "Tunis": 18, "Ariana": 10, "La Marsa": 0, "Université de Carthage": 4,
    "Bizerte": 83, "Nabeul": 58, "Hammamet": 55,
    "Sousse": 163, "Monastir": 178, "Kairouan": 172, "Sfax": 287,
  },
  "Université de Carthage": {
    "Tunis": 15, "Ariana": 12, "La Marsa": 4, "Université de Carthage": 0,
    "Bizerte": 81, "Nabeul": 56, "Hammamet": 53,
    "Sousse": 160, "Monastir": 177, "Kairouan": 169, "Sfax": 284,
  },
  "Sfax": {
    "Tunis": 270, "Ariana": 278, "La Marsa": 287, "Université de Carthage": 284,
    "Sfax": 0, "Sousse": 130, "Monastir": 115, "Kairouan": 130,
    "Nabeul": 200, "Bizerte": 336, "Gabès": 135,
    "Médenine": 250, "Zarzis": 290, "Djerba": 270,
  },
  "Sousse": {
    "Tunis": 145, "Ariana": 153, "La Marsa": 163, "Université de Carthage": 160,
    "Sfax": 130, "Sousse": 0, "Monastir": 28, "Kairouan": 57,
    "Nabeul": 80, "Hammamet": 75, "Bizerte": 210, "Gabès": 265,
  },
  "Nabeul": {
    "Tunis": 65, "Ariana": 72, "La Marsa": 58, "Université de Carthage": 56,
    "Nabeul": 0, "Hammamet": 7, "Bizerte": 130,
    "Sousse": 80, "Monastir": 96, "Kairouan": 130, "Sfax": 200,
  },
  "Hammamet": {
    "Tunis": 60, "Ariana": 67, "La Marsa": 55, "Université de Carthage": 53,
    "Nabeul": 7, "Hammamet": 0, "Sousse": 75, "Monastir": 90, "Sfax": 195,
  },
  "Bizerte": {
    "Tunis": 66, "Ariana": 74, "La Marsa": 83, "Université de Carthage": 81,
    "Bizerte": 0, "Nabeul": 130, "Sousse": 210,
  },
  "Monastir": {
    "Tunis": 162, "Ariana": 170, "La Marsa": 178, "Université de Carthage": 177,
    "Sfax": 115, "Sousse": 28, "Monastir": 0, "Kairouan": 60,
    "Nabeul": 96, "Gabès": 180,
  },
  "Kairouan": {
    "Tunis": 156, "Ariana": 162, "La Marsa": 172, "Université de Carthage": 169,
    "Sfax": 130, "Sousse": 57, "Monastir": 60, "Kairouan": 0,
    "Gafsa": 160, "Gabès": 220,
  },
  "Gabès": {
    "Tunis": 398, "Sfax": 135, "Monastir": 180, "Kairouan": 220,
    "Gabès": 0, "Médenine": 130, "Zarzis": 170, "Djerba": 145, "Gafsa": 200,
  },
  "Médenine": {
    "Tunis": 510, "Sfax": 250, "Gabès": 130,
    "Médenine": 0, "Zarzis": 55, "Djerba": 75,
  },
  "Zarzis": {
    "Tunis": 555, "Sfax": 290, "Gabès": 170,
    "Médenine": 55, "Zarzis": 0, "Djerba": 35,
  },
  "Djerba": {
    "Tunis": 530, "Sfax": 270, "Gabès": 145,
    "Médenine": 75, "Zarzis": 35, "Djerba": 0,
  },
  "Gafsa": {
    "Tunis": 345, "Kairouan": 160, "Gabès": 200, "Gafsa": 0,
  },
};

export function getCitiesInRadius(city: string, rayonKm: number): string[] {
  const dists = DISTANCES[city];
  if (!dists) return [city];
  return Object.entries(dists)
    .filter(([, d]) => d <= rayonKm)
    .map(([c]) => c);
}
