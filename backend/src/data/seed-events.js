import { formatDate, todayStart } from "../utils/date.js";

// Bugünden n gün önce/sonra, "GG-AA-YYYY" biçiminde.
// Tarihler bugüne göre hesaplanır: 2 etkinlik geçmişte, 4 etkinlik gelecekte kalır,
// böylece /events/upcoming ile /events her zaman farklı liste verir.
function gunSonra(n) {
  const d = todayStart();
  d.setUTCDate(d.getUTCDate() + n);
  return formatDate(d);
}

export const seedEvents = [
  {
    title: "Yangın Tatbikatı",
    category: "Seminer",
    capacity: 100,
    date: gunSonra(-30), // geçmiş
    time: "14:00",
    location: "Okul Bahçesi",
    description: "Öğrencilerimizin dikkatli ve soğukkanlı olması gerekmektedir.",
  },
  {
    title: "Siber Suçlarla Mücadele Atölyesi",
    category: "Atölye",
    capacity: 100,
    date: gunSonra(-12), // geçmiş
    time: "16:00",
    location: "Konferans Salonu",
    description: "Öğrencilerimizin dikkatli olması gerekmektedir.",
  },
  {
    title: "Mesleki Yabancı Dil",
    category: "Söyleşi",
    capacity: 100,
    date: gunSonra(5),
    time: "14:00",
    location: "2 nolu Salon",
    description:
      "Öğrencilerimizin yanlarında defter ve kalem getirmeleri rica olunur.",
  },
  {
    title: "Tiyatro Deneme Dersi",
    category: "Seminer",
    capacity: 100,
    date: gunSonra(9),
    time: "18:00",
    location: "Okul Bahçesi",
    description:
      "Öğrencilerimizin yanlarında öğrenci kimliklerini getirmeleri zorunludur.",
  },
  {
    title: "Günübirlik (Ankara) Anıtkabir Gezisi",
    category: "Atölye",
    capacity: 30,
    date: gunSonra(14),
    time: "09:00",
    location: "Okul Bahçesi",
    description:
      "Öğrencilerimizin okul bahçesinde toplanmaları gerekmektedir.",
  },
  {
    title: "Okul Başkanı Seçimi",
    category: "Yarışma",
    capacity: 550,
    date: gunSonra(21),
    time: "14:00",
    location: "Okul Bahçesi",
    description:
      "Öğrencilerimizin yanlarında öğrenci kimlikleriyle gelip ibraz etmesi zorunludur.",
  },
];
