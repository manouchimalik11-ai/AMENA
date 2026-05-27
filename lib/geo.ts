export interface Governorate {
  key: string;
  fr: string;
  ar: string;
  cities: string[];
}

// 24 gouvernorats tunisiens, triés alphabétiquement, avec leurs délégations officielles.
// La première entrée de cities[] est le nom court utilisé dans les annonces existantes.
export const GOVERNORATES: Governorate[] = [
  {
    key: "ariana", fr: "Ariana", ar: "أريانة",
    cities: [
      "Ariana", "Ariana Ville", "Ettadhamen", "Kalâat el-Andalous",
      "La Soukra", "Mnihla", "Raoued", "Sidi Thabet",
    ],
  },
  {
    key: "beja", fr: "Béja", ar: "باجة",
    cities: [
      "Béja", "Béja Nord", "Béja Sud", "Amdoun", "Goubellat",
      "Medjez el-Bab", "Nefza", "Téboursouk", "Testour", "Thibar",
    ],
  },
  {
    key: "ben-arous", fr: "Ben Arous", ar: "بن عروس",
    cities: [
      "Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra",
      "Fouchana", "Hammam Chott", "Hammam Lif", "Médina Jedida",
      "Mégrine", "Mohamedia", "Nouvelle Médina", "Radès",
    ],
  },
  {
    key: "bizerte", fr: "Bizerte", ar: "بنزرت",
    cities: [
      "Bizerte", "Bizerte Nord", "Bizerte Sud", "El Alia", "Ghar El Melh",
      "Ghezala", "Joumine", "Mateur", "Menzel Bourguiba", "Menzel Jemil",
      "Ras Jebel", "Sejnane", "Tinja", "Utique", "Zarzouna",
    ],
  },
  {
    key: "gabes", fr: "Gabès", ar: "قابس",
    cities: [
      "Gabès", "Gabès Médina", "Gabès Ouest", "Gabès Sud",
      "El Hamma", "Ghannouch", "Mareth", "Matmata",
      "Menzel El Habib", "Nouvelle Matmata",
    ],
  },
  {
    key: "gafsa", fr: "Gafsa", ar: "قفصة",
    cities: [
      "Gafsa", "Gafsa Nord", "Gafsa Sud", "Belkhir", "El Guettar",
      "El Ksar", "Mdhilla", "Métlaoui", "Moularès", "Om Larayes",
      "Redeyef", "Sened", "Sidi Aïch",
    ],
  },
  {
    key: "jendouba", fr: "Jendouba", ar: "جندوبة",
    cities: [
      "Jendouba", "Jendouba Nord", "Aïn Draham", "Balta - Bou Amdène",
      "Bou Salem", "Fernana", "Ghardimaou", "Oued Meliz", "Tabarka",
    ],
  },
  {
    key: "kairouan", fr: "Kairouan", ar: "القيروان",
    cities: [
      "Kairouan", "Kairouan Nord", "Kairouan Sud", "Bouhajla", "Chebika",
      "Cherarda", "El Ala", "El Oueslatia", "Haffouz",
      "Hajeb El Ayoun", "Nasrallah", "Sbikha",
    ],
  },
  {
    key: "kasserine", fr: "Kasserine", ar: "القصرين",
    cities: [
      "Kasserine", "Kasserine Nord", "Kasserine Sud", "Ezzouhour",
      "Feriana", "Foussana", "Haïdra", "Hassi El Frid", "Hidra",
      "Jediliane", "Majel Bel Abbès", "Sbeitla", "Sbiba", "Thala",
    ],
  },
  {
    key: "kebili", fr: "Kébili", ar: "قبلي",
    cities: [
      "Kébili", "Kébili Nord", "Kébili Sud",
      "Douz Nord", "Douz Sud", "El Faouar", "Souk Lahad",
    ],
  },
  {
    key: "kef", fr: "Le Kef", ar: "الكاف",
    cities: [
      "Le Kef", "Le Kef Est", "Le Kef Ouest", "Dahmani", "El Ksour",
      "Jérissa", "Kalaat Khasba", "Kalaat Sinane", "Nebeur",
      "Sakiet Sidi Youssef", "Tajerouine", "Touiref",
    ],
  },
  {
    key: "mahdia", fr: "Mahdia", ar: "المهدية",
    cities: [
      "Mahdia", "Bou Merdes", "Chebba", "Chorbane", "El Jem",
      "Essouassi", "Ksour Essaf", "Melloulèche",
      "Ouled Chamekh", "Salakta", "Sidi Alouane",
    ],
  },
  {
    key: "manouba", fr: "Manouba", ar: "منوبة",
    cities: [
      "Manouba", "Borj El Amri", "Denden", "Douar Hicher",
      "El Battan", "Jedaïda", "Mornaguia", "Oued Ellil", "Tebourba",
    ],
  },
  {
    key: "medenine", fr: "Médenine", ar: "مدنين",
    cities: [
      "Médenine", "Médenine Nord", "Médenine Sud", "Ben Gardane",
      "Beni Khedache", "Djerba - Ajim", "Djerba - Houmt Souk",
      "Djerba - Midoun", "Sidi Makhlouf", "Zarzis",
    ],
  },
  {
    key: "monastir", fr: "Monastir", ar: "المنستير",
    cities: [
      "Monastir", "Bekalta", "Bembla", "Beni Hassen", "Jammel",
      "Ksar Hellal", "Ksibet El Médiouni", "Moknine", "Ouerdanine",
      "Sahline", "Sayada - Lamta - Bou Hajar", "Téboulba", "Zeramdine",
    ],
  },
  {
    key: "nabeul", fr: "Nabeul", ar: "نابل",
    cities: [
      "Nabeul", "Beni Khaled", "Beni Khiar", "Bou Argoub",
      "Dar Chaabane El Fehri", "El Haouaria", "El Mida", "Grombalia",
      "Hammam El Ghezaz", "Hammamet", "Kelibia", "Korba",
      "Menzel Bouzelfa", "Menzel Temime", "Soliman", "Takelsa",
    ],
  },
  {
    key: "sfax", fr: "Sfax", ar: "صفاقس",
    cities: [
      "Sfax", "Sfax Est", "Sfax Médina", "Sfax Ouest", "Agareb",
      "Bir Ali Ben Khalifa", "El Amra", "El Ain", "El Ghraïba",
      "Graïba", "Hencha", "Jebiniana", "Kerkennah", "Mahres",
      "Menzel Chaker", "Sakiet Eddaïr", "Sakiet Ezzit", "Skhira", "Thyna",
    ],
  },
  {
    key: "sidi-bouzid", fr: "Sidi Bouzid", ar: "سيدي بوزيد",
    cities: [
      "Sidi Bouzid", "Sidi Bouzid Est", "Sidi Bouzid Ouest",
      "Bir El Hafey", "Cebbala Ouled Asker", "El Meknassy", "Jilma",
      "Menzel Bouzaiene", "Mezzouna", "Ouled Haffouz",
      "Regueb", "Sidi Ali Ben Aoun", "Souk Jedid",
    ],
  },
  {
    key: "siliana", fr: "Siliana", ar: "سليانة",
    cities: [
      "Siliana", "Siliana Nord", "Siliana Sud", "Bargou", "Bou Arada",
      "El Aroussa", "El Krib", "Gaâfour", "Kesra",
      "Makthar", "Rohia", "Sidi Bou Rouis",
    ],
  },
  {
    key: "sousse", fr: "Sousse", ar: "سوسة",
    cities: [
      "Sousse", "Sousse Jawhara", "Sousse Médina", "Sousse Riadh",
      "Sousse Sidi Abdelhamid", "Akouda", "Bouficha", "Enfidha",
      "Hammam Sousse", "Hergla", "Kalaa Kebira", "Kalaa Seghira",
      "Kondar", "Msaken", "Sidi Bou Ali", "Sidi El Hani",
    ],
  },
  {
    key: "tataouine", fr: "Tataouine", ar: "تطاوين",
    cities: [
      "Tataouine", "Tataouine Nord", "Tataouine Sud",
      "Bir Lahmar", "Dhiba", "Ghomrassen", "Remada", "Smar",
    ],
  },
  {
    key: "tozeur", fr: "Tozeur", ar: "توزر",
    cities: [
      "Tozeur", "Degache", "Hazoua", "Nefta", "Tamaghza",
    ],
  },
  {
    key: "tunis", fr: "Tunis", ar: "تونس",
    cities: [
      "Tunis", "Bab El Bhar", "Bab Souika", "Carthage", "El Hrairia",
      "El Kabaria", "El Menzah", "El Omrane", "El Omrane Supérieur",
      "El Ouardia", "Ettahrir", "Ezzouhour", "Hai El Khadra",
      "Jellaz", "La Goulette", "La Marsa", "Le Bardo", "Le Kram",
      "Médina", "Séjoumi", "Sidi El Béchir", "Sidi Hassine",
    ],
  },
  {
    key: "zaghouan", fr: "Zaghouan", ar: "زغوان",
    cities: [
      "Zaghouan", "Bir Mcherga", "El Fahs", "Nadhour", "Saouaf", "Zriba",
    ],
  },
];

export function findGovernorat(cityName: string): Governorate | undefined {
  const lower = cityName.toLowerCase();
  return GOVERNORATES.find(g =>
    g.fr.toLowerCase() === lower ||
    g.cities.some(c => c.toLowerCase() === lower)
  );
}
