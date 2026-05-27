export type AnnonceType = "perdu" | "trouve";

export interface Annonce {
  id: number;
  titre: { fr: string; ar: string };
  lieu: string;
  temps: { fr: string; ar: string };
  heuresEcoulees: number;
  type: AnnonceType;
  categorie: string;
  image: string;
  description: { fr: string; ar: string };
  boosted?: boolean;
  boostedUntil?: number; // timestamp ms
}

export const categories = [
  { icon: "📱", key: "phones", fr: "Téléphones", ar: "تيليفونات" },
  { icon: "🔑", key: "keys", fr: "Clés", ar: "مفاتح" },
  { icon: "👜", key: "wallets", fr: "Portefeuilles", ar: "محافظ" },
  { icon: "📄", key: "documents", fr: "Documents", ar: "وثايق" },
  { icon: "🐾", key: "animals", fr: "Animaux", ar: "حيوانات" },
  { icon: "📦", key: "other", fr: "Autres", ar: "أخرى" },
];

export const annonces: Annonce[] = [
  {
    id: 1,
    titre: { fr: "iPhone 13 gris", ar: "آيفون 13 رمادي" },
    lieu: "Tunis",
    temps: { fr: "Il y a 2 heures", ar: "من 2 ساعات" },
    heuresEcoulees: 2,
    type: "perdu",
    categorie: "phones",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&h=500&fit=crop",
    description: {
      fr: "iPhone 13 gris perdu dans le métro ligne 1, station République. Fond d'écran photo de famille. Récompense promise.",
      ar: "آيفون 13 رمادي ضاع في الترينو خط 1، محطة الجمهورية. فند الشاشة صورة العيلة. نكافئ من يرجعو.",
    },
    boosted: true,
    boostedUntil: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: 2,
    titre: { fr: "Portefeuille en cuir", ar: "محفظة جلد" },
    lieu: "Sfax",
    temps: { fr: "Il y a 9 heures", ar: "من 9 ساعات" },
    heuresEcoulees: 9,
    type: "trouve",
    categorie: "wallets",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=500&fit=crop",
    description: {
      fr: "Portefeuille en cuir bleu marine trouvé devant le café Central à Sfax. Contient des cartes et de l'argent. Contactez-moi pour le récupérer.",
      ar: "محفظة جلد كحلة لقيتها قدام قهوة السنترال في صفاقس. فيها كارطات وفلوس. تواصلو معايا باش ترجعوها.",
    },
  },
  {
    id: 3,
    titre: { fr: "Clé de voiture Renault", ar: "مفتاح كرهبة رونو" },
    lieu: "Ariana",
    temps: { fr: "Il y a 3 heures", ar: "من 3 ساعات" },
    heuresEcoulees: 3,
    type: "perdu",
    categorie: "keys",
    image: "/cle-voiture.jpg",
    description: {
      fr: "Clé de voiture Renault Clio perdue à la Galeria Jean, Ariana. Porte-clés rouge en forme de cœur.",
      ar: "مفتاح كرهبة رونو كليو ضاع في قالاريا جيان أريانة. فيه سلسلة حمرا على شكل قلب.",
    },
  },
  {
    id: 4,
    titre: { fr: "Sac à main beige", ar: "شنطة بيج" },
    lieu: "La Marsa",
    temps: { fr: "Il y a 2 jours", ar: "من يومين" },
    heuresEcoulees: 48,
    type: "trouve",
    categorie: "wallets",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=500&fit=crop",
    description: {
      fr: "Sac à main beige trouvé sur la plage de La Marsa. Contient des effets personnels. Contactez-moi pour le récupérer.",
      ar: "شنطة يد بيج لقيتها في الشاطئ المرسى. فيها حوايج شخصية. تواصلو معايا باش ترجعوها.",
    },
  },
  {
    id: 5,
    titre: { fr: "Chat siamois disparu", ar: "قطوس سيامي ضايع" },
    lieu: "Sousse",
    temps: { fr: "Il y a 5 jours", ar: "من 5 أيام" },
    heuresEcoulees: 120,
    type: "perdu",
    categorie: "animals",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop",
    description: {
      fr: "Chat siamois nommé Simba disparu dans le quartier El Khazama, Sousse. Porte un collier bleu. Très important pour notre famille.",
      ar: "قطوس سيامي اسمو سيمبا ضاع في حي الخزامى سوسة. عليه قلادة زرقا. مهم برشا لعيلتنا.",
    },
  },
  {
    id: 6,
    titre: { fr: "Carte d'identité nationale", ar: "بطاقة هوية وطنية" },
    lieu: "Sfax",
    temps: { fr: "Il y a 2 heures", ar: "من 2 ساعات" },
    heuresEcoulees: 2,
    type: "trouve",
    categorie: "documents",
    image: "/carte-identite.png",
    description: {
      fr: "Carte nationale d'identité trouvée devant la poste de Sfax centre. Le propriétaire peut me contacter avec ses informations pour la récupérer.",
      ar: "بطاقة هوية وطنية لقيتها قدام بوسطة صفاقس الوسطى. صاحبها يتواصل معايا بمعلوماتو باش يرجعها.",
    },
  },
  {
    id: 7,
    titre: { fr: "Cahier de révision", ar: "كراسة مراجعة" },
    lieu: "Carthage",
    temps: { fr: "Il y a 10 jours", ar: "من 10 أيام" },
    heuresEcoulees: 240,
    type: "perdu",
    categorie: "documents",
    image: "https://images.unsplash.com/photo-1769794371008-954a71d95ce8?w=800&h=500&fit=crop",
    description: {
      fr: "Cahier de révision perdu à la bibliothèque de l'Université de Carthage. Couverture bleue avec 'Ahmed' écrit dessus. L'examen est dans 3 jours.",
      ar: "كراسة مراجعة ضاعت في مكتبة جامعة قرطاج. غلافها أزرق ومكتوب عليها 'أحمد'. الامتحان بعد 3 أيام.",
    },
  },
  {
    id: 8,
    titre: { fr: "AirPods Pro", ar: "آيربودس برو" },
    lieu: "Nabeul",
    temps: { fr: "Il y a 6 heures", ar: "من 6 ساعات" },
    heuresEcoulees: 6,
    type: "trouve",
    categorie: "phones",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=500&fit=crop",
    description: {
      fr: "AirPods Pro trouvés dans un taxi à Nabeul. Boîtier blanc avec numéro de série inscrit. Contactez-moi avec la description pour les récupérer.",
      ar: "آيربودس برو لقيتهم في تاكسي بنابل. الواحة بيضاء ومكتوب عليها رقم سيريال. تواصلو معايا بالوصف باش ترجعوهم.",
    },
  },
];
