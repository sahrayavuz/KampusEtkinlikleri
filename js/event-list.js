import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const arama = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const filtreFormu = document.querySelector("#filtre-formu");
const sonucSatiri = document.querySelector("#sonuc");

function formatDate(tarih) {
  return new Date(tarih + "T00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function createCard(event) {
  return `<article class="kart">
    <h2>${event.title}</h2>
    <p class="etiket">${event.category}</p>
    <p>Tarih: ${formatDate(event.date)}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

function filtrele() {
  const aranan = arama.value.toLocaleLowerCase("tr-TR");
  const kategori = kategoriFiltre.value;

  const sonuc = events.filter((e) => {
    const metinUyuyor =
      e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
      e.category.toLocaleLowerCase("tr-TR").includes(aranan) ||
      e.description.toLocaleLowerCase("tr-TR").includes(aranan);
    const kategoriUyuyor = kategori === "" || e.category === kategori;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);
  sonucSatiri.textContent =
    sonuc.length === 0
      ? "Aramanıza uygun etkinlik bulunamadı."
      : `${sonuc.length} etkinlik listeleniyor.`;
}

if (list.dataset.limit) {
  // Ana sayfa: tarihi en yakın N etkinlik (önce kopyala, sonra sırala)
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  // Etkinlikler sayfası: kategori seçeneklerini veriden üret
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriFiltre.innerHTML += kategoriler
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  filtrele(); // açılışta 6 etkinlik + sonuç satırı
}