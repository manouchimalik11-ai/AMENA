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
    titre: { fr: "Clé de voiture Golf 7", ar: "مفتاح كرهبة غولف 7" },
    lieu: "Ariana",
    temps: { fr: "Il y a 3 heures", ar: "من 3 ساعات" },
    heuresEcoulees: 3,
    type: "perdu",
    categorie: "keys",
    image: "/cle-voiture.jpg",
    description: {
      fr: "Clé de voiture Golf 7 perdue à la Galeria Jean, Ariana. Porte-clés rouge en forme de cœur.",
      ar: "مفتاح كرهبة غولف 7 ضاع في قالاريا جيان أريانة. فيه سلسلة حمرا على شكل قلب.",
    },
  },
  {
    id: 4,
    titre: { fr: "Sac à main noir", ar: "شنطة سوداء" },
    lieu: "La Marsa",
    temps: { fr: "Il y a 2 jours", ar: "من يومين" },
    heuresEcoulees: 48,
    type: "trouve",
    categorie: "wallets",
    image: "/sac-a-main.png",
    description: {
      fr: "Sac à main noir trouvé sur la plage de La Marsa. Contient des effets personnels. Contactez-moi pour le récupérer.",
      ar: "شنطة يد سوداء لقيتها في الشاطئ المرسى. فيها حوايج شخصية. تواصلو معايا باش ترجعوها.",
    },
  },
  {
    id: 5,
    titre: { fr: "Chat siamois", ar: "قطوس سيامي" },
    lieu: "Sousse",
    temps: { fr: "Il y a 5 jours", ar: "من 5 أيام" },
    heuresEcoulees: 120,
    type: "perdu",
    categorie: "animals",
    image: "/OSK.jpg",
    description: {
      fr: "Chat siamois nommé Simba disparu dans le quartier El Khazama, Sousse. Porte un collier bleu. Très important pour notre famille.",
      ar: "قطوس سيامي اسمو سيمبا ضاع في حي الخزامى سوسة. عليه قلادة زرقا. مهم برشا لعيلتنا.",
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
    id: 13,
    titre: { fr: "Lunettes de vue trouvées", ar: "نظارات طبية ملقاة" },
    lieu: "Gabès",
    temps: { fr: "Il y a 10 heures", ar: "من 10 ساعات" },
    heuresEcoulees: 10,
    type: "trouve",
    categorie: "other",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=500&fit=crop",
    description: {
      fr: "Lunettes de vue trouvées à Gabès. Monture noire, verres correcteurs. Contactez-moi avec la description pour les récupérer.",
      ar: "نظارات طبية لقيتها في قابس. إطار أسود وعدسات تصحيحية. تواصلو معايا بالوصف باش ترجعوها.",
    },
  },
  {
    id: 12,
    titre: { fr: "Gilet beige trouvé", ar: "جيلي بيج ملقى" },
    lieu: "Menzah 1",
    temps: { fr: "Il y a 21 jours", ar: "من 21 يوم" },
    heuresEcoulees: 504,
    type: "trouve",
    categorie: "other",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=500&fit=crop",
    description: {
      fr: "Gilet de jeune homme trouvé dans un parc public au Menzah 1. Semble appartenir à un adolescent ou jeune adulte. Contactez-moi avec la description pour le récupérer.",
      ar: "جيلي لشاب لقيتو في حديقة عامة في المنزه 1. يبدو أنو لشاب صغير. تواصلو معايا بالوصف باش ترجعوه.",
    },
  },
  {
    id: 11,
    titre: { fr: "Clés d'appartement", ar: "مفاتح شقة" },
    lieu: "Bizerte",
    temps: { fr: "Il y a 6 jours", ar: "من 6 أيام" },
    heuresEcoulees: 144,
    type: "perdu",
    categorie: "keys",
    image: "/cle-app.png",
    description: {
      fr: "Clés d'appartement perdues à Bizerte. Trousseau avec 3 clés et un porte-clés bleu. Perdu probablement dans le centre-ville. Récompense promise.",
      ar: "مفاتح شقة ضاعت في بنزرت. سلسلة بـ3 مفاتح وبورت كلي أزرق. ضاعت على الأرجح في وسط المدينة. نكافئ من يرجعها.",
    },
  },
  {
    id: 9,
    titre: { fr: "Chien caniche perdu", ar: "كلب بودل ضايع" },
    lieu: "Bardo",
    temps: { fr: "Il y a 1 jour", ar: "من يوم" },
    heuresEcoulees: 24,
    type: "perdu",
    categorie: "animals",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800&h=500&fit=crop",
    description: {
      fr: "Chien caniche blanc perdu au Bardo. Répond au nom de Milou. Porte un collier rose. Si vous l'avez vu, contactez-nous.",
      ar: "كلب بودل أبيض ضاع في باردو. اسمو ميلو. عليه قلادة وردية. تواصلو معانا كي تشوفوه.",
    },
  },
  {
    id: 10,
    titre: { fr: "Chargeur Samsung perdu", ar: "شاحن سامسونج ضايع" },
    lieu: "Tunis",
    temps: { fr: "Il y a 4 heures", ar: "من 4 ساعات" },
    heuresEcoulees: 4,
    type: "perdu",
    categorie: "phones",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&h=500&fit=crop",
    description: {
      fr: "Chargeur Samsung perdu à l'Université Tunis El Manar. Chargeur rapide 25W avec câble USB-C. Perdu en salle de cours ou à la bibliothèque.",
      ar: "شاحن سامسونج ضاع في جامعة تونس المنار. شاحن سريع 25W مع كابل USB-C. ضاع في قاعة الدراسة أو المكتبة.",
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
    image: "/airpods-pro.jpg",
    description: {
      fr: "AirPods Pro trouvés dans un taxi à Nabeul. Boîtier blanc avec numéro de série inscrit. Contactez-moi avec la description pour les récupérer.",
      ar: "آيربودس برو لقيتهم في تاكسي بنابل. الواحة بيضاء ومكتوب عليها رقم سيريال. تواصلو معايا بالوصف باش ترجعوهم.",
    },
  },
];
