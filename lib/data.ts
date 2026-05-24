export type AnnonceType = "perdu" | "trouve";

export interface Annonce {
  id: number;
  titre: string;
  lieu: string;
  temps: string;
  type: AnnonceType;
  categorie: string;
  image: string;
  description: string;
}

export const categories = [
  { icon: "📱", label: "Téléphones" },
  { icon: "🔑", label: "Clés" },
  { icon: "👜", label: "Portefeuilles" },
  { icon: "📄", label: "Documents" },
  { icon: "🐾", label: "Animaux" },
  { icon: "📦", label: "Autre" },
];

export const annonces: Annonce[] = [
  {
    id: 1,
    titre: "iPhone 13",
    lieu: "Tunis",
    temps: "Il y a 2h",
    type: "perdu",
    categorie: "Téléphones",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&h=500&fit=crop",
    description: "iPhone 13 noir perdu dans le métro ligne 1, station République. Fond d'écran photo de famille. Récompense offerte pour toute information.",
  },
  {
    id: 2,
    titre: "Portefeuille en cuir",
    lieu: "Sfax",
    temps: "Il y a 9h",
    type: "trouve",
    categorie: "Portefeuilles",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=500&fit=crop",
    description: "Portefeuille en cuir brun trouvé devant le café Central à Sfax. Contient des cartes et des billets. Contactez-moi pour récupérer.",
  },
  {
    id: 3,
    titre: "Clé de voiture",
    lieu: "Ariana",
    temps: "Il y a 3h",
    type: "perdu",
    categorie: "Clés",
    image: "/cle-voiture.jpg",
    description: "Clé de voiture Renault Clio perdue au centre commercial Géant Ariana. Porte-clé rouge en forme de cœur. Contactez-moi si vous l'avez trouvée.",
  },
  {
    id: 4,
    titre: "Sac à main beige",
    lieu: "La Marsa",
    temps: "Il y a 4h",
    type: "trouve",
    categorie: "Portefeuilles",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=500&fit=crop",
    description: "Sac à main beige trouvé sur la plage de La Marsa. Contient des effets personnels. Merci de me contacter pour le récupérer rapidement.",
  },
  {
    id: 5,
    titre: "Chat siamois perdu",
    lieu: "Sousse",
    temps: "Il y a 5h",
    type: "perdu",
    categorie: "Animaux",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop",
    description: "Chat siamois répondant au nom de Simba, perdu dans le quartier Khezama à Sousse. Il porte un collier bleu. Très important pour notre famille.",
  },
  {
    id: 6,
    titre: "Carte d'identité",
    lieu: "Sfax",
    temps: "Il y a 2h",
    type: "trouve",
    categorie: "Documents",
    image: "/carte-identite.png",
    description: "Carte d'identité nationale trouvée devant la poste centrale de Sfax. Le propriétaire peut me contacter avec ses informations pour la récupérer.",
  },
  {
    id: 7,
    titre: "Cahier de révision",
    lieu: "Univ. de Carthage",
    temps: "Il y a 6h",
    type: "perdu",
    categorie: "Documents",
    image: "https://images.unsplash.com/photo-1769794371008-954a71d95ce8?w=800&h=500&fit=crop",
    description: "Cahier de révision perdu à la bibliothèque de l'Université de Carthage. Couverture bleue avec le prénom 'Ahmed' écrit dessus. Examen dans 3 jours.",
  },
  {
    id: 8,
    titre: "AirPods Pro",
    lieu: "Nabeul",
    temps: "Il y a 6h",
    type: "trouve",
    categorie: "Téléphones",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=500&fit=crop",
    description: "AirPods Pro trouvés dans un taxi à Nabeul. Boîtier blanc avec numéro de série visible. Contactez-moi avec la description pour les récupérer.",
  },
];
