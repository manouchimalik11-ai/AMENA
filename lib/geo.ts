export interface Governorate {
  key: string;
  fr: string;
  ar: string;
  cities: string[];
}

export const GOVERNORATES: Governorate[] = [
  {
    key: "tunis", fr: "Tunis", ar: "تونس",
    cities: ["Tunis", "La Marsa", "Carthage", "Université de Carthage", "Le Bardo", "La Goulette", "Sidi Bou Saïd", "Ezzouhour", "El Omrane", "Séjoumi"],
  },
  {
    key: "ariana", fr: "Ariana", ar: "أريانة",
    cities: ["Ariana", "Raoued", "La Soukra", "Kalaat el-Andalous", "Sidi Thabet", "Ettadhamen"],
  },
  {
    key: "ben-arous", fr: "Ben Arous", ar: "بن عروس",
    cities: ["Ben Arous", "Hammam Lif", "Radès", "Mégrine", "Hammam Chott", "Bou Mhel el-Bassatine", "El Mourouj", "Fouchana"],
  },
  {
    key: "manouba", fr: "Manouba", ar: "منوبة",
    cities: ["Manouba", "Denden", "Oued Ellil", "Tebourba", "Douar Hicher", "El Battan", "Borj El Amri"],
  },
  {
    key: "nabeul", fr: "Nabeul", ar: "نابل",
    cities: ["Nabeul", "Hammamet", "Kelibia", "Grombalia", "Dar Chaabane", "Menzel Temime", "El Haouaria", "Korba", "Beni Khiar", "Soliman"],
  },
  {
    key: "zaghouan", fr: "Zaghouan", ar: "زغوان",
    cities: ["Zaghouan", "Zriba", "El Fahs", "Bir Mcherga", "Hammam Zriba"],
  },
  {
    key: "bizerte", fr: "Bizerte", ar: "بنزرت",
    cities: ["Bizerte", "Menzel Bourguiba", "Mateur", "Ras Jebel", "El Alia", "Menzel Jemil", "Ghar El Melh", "Sejnane", "Tinja"],
  },
  {
    key: "beja", fr: "Béja", ar: "باجة",
    cities: ["Béja", "Medjez el-Bab", "Testour", "Nefza", "Téboursouk", "Goubellat", "Amdoun"],
  },
  {
    key: "jendouba", fr: "Jendouba", ar: "جندوبة",
    cities: ["Jendouba", "Tabarka", "Ain Draham", "Bou Salem", "Ghardimaou", "Fernana", "Oued Meliz"],
  },
  {
    key: "kef", fr: "Le Kef", ar: "الكاف",
    cities: ["Le Kef", "Dahmani", "Sakiet Sidi Youssef", "Tajerouine", "Nebeur", "El Ksour"],
  },
  {
    key: "siliana", fr: "Siliana", ar: "سليانة",
    cities: ["Siliana", "Makthar", "Bou Arada", "El Aroussa", "Gaafour", "Rouhia"],
  },
  {
    key: "kairouan", fr: "Kairouan", ar: "القيروان",
    cities: ["Kairouan", "Sbikha", "Haffouz", "Chebika", "El Oueslatia", "Bouhajla", "Nasrallah"],
  },
  {
    key: "kasserine", fr: "Kasserine", ar: "القصرين",
    cities: ["Kasserine", "Sbeitla", "Thala", "Feriana", "Haïdra", "Foussana", "Jediliane"],
  },
  {
    key: "sidi-bouzid", fr: "Sidi Bouzid", ar: "سيدي بوزيد",
    cities: ["Sidi Bouzid", "Regueb", "Bir El Hafey", "Jelma", "Meknassy", "Menzel Bouzaiene"],
  },
  {
    key: "sousse", fr: "Sousse", ar: "سوسة",
    cities: ["Sousse", "Msaken", "Hammam Sousse", "Akouda", "Kalaa Kebira", "Enfidha", "Sidi Bou Ali", "Hergla"],
  },
  {
    key: "monastir", fr: "Monastir", ar: "المنستير",
    cities: ["Monastir", "Ksar Hellal", "Moknine", "Jemmel", "Bembla", "Téboulba", "Sayada", "Bekalta"],
  },
  {
    key: "mahdia", fr: "Mahdia", ar: "المهدية",
    cities: ["Mahdia", "El Jem", "Ksour Essaf", "Chebba", "Salakta", "Bou Merdes"],
  },
  {
    key: "sfax", fr: "Sfax", ar: "صفاقس",
    cities: ["Sfax", "Kerkennah", "Sakiet Ezzit", "Sakiet Eddaïr", "El Hencha", "Thyna", "Agareb", "Bir Ali Ben Khalifa"],
  },
  {
    key: "gafsa", fr: "Gafsa", ar: "قفصة",
    cities: ["Gafsa", "Métlaoui", "Moularès", "Redeyef", "El Gtar", "Om Larayes"],
  },
  {
    key: "tozeur", fr: "Tozeur", ar: "توزر",
    cities: ["Tozeur", "Degache", "Nefta", "Hazoua", "Tameghza"],
  },
  {
    key: "kebili", fr: "Kébili", ar: "قبلي",
    cities: ["Kébili", "Douz", "El Faouar", "Souk Lahad"],
  },
  {
    key: "gabes", fr: "Gabès", ar: "قابس",
    cities: ["Gabès", "Mareth", "Matmata", "Ghannouch", "El Hamma", "Nouvelle Matmata"],
  },
  {
    key: "medenine", fr: "Médenine", ar: "مدنين",
    cities: ["Médenine", "Zarzis", "Ben Gardane", "Djerba (Houmt Souk)", "Midoun", "Beni Khedache", "Sidi Makhlouf"],
  },
  {
    key: "tataouine", fr: "Tataouine", ar: "تطاوين",
    cities: ["Tataouine", "Ghomrassen", "Remada", "Dehiba", "Bir Lahmar"],
  },
];

export function findGovernorat(cityName: string): Governorate | undefined {
  const lower = cityName.toLowerCase();
  return GOVERNORATES.find(g =>
    g.fr.toLowerCase() === lower ||
    g.cities.some(c => c.toLowerCase() === lower)
  );
}
