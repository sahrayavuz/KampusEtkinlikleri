import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const arama = document.querySelector("#arama");
const kategoriSecimi = document.querySelector("#kategori-filtre");
const filtreFormu = document.querySelector("#filtre-formu");
const sonucSatiri = document.querySelector("#sonuc");

function tarihYaz(tarih, saat) {
  const gun = new Date(`${tarih}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${gun}, ${saat}`;
}

function createCard(event) {
  const baslik = list.dataset.limit ? "h3" : "h2";
  return `<article class="kart">
    <${baslik}>${event.title}</${baslik}>
    <p><span class="etiket">${event.category}</span></p>
    <p>Tarih: ${tarihYaz(event.date, event.time)}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

function kategorileriDoldur() {
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const secenek = document.createElement("option");
    secenek.value = kategori;
    secenek.textContent = kategori;
    kategoriSecimi.append(secenek);
  });
}

function filtrele() {
  const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
  const kategori = kategoriSecimi.value;

  const sonuc = events.filter((e) => {
    const metin = `${e.title} ${e.category} ${e.location} ${e.description}`
      .toLocaleLowerCase("tr-TR");
    const metinUyuyor = metin.includes(aranan);
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
  // Ana sayfa: tarihi en yakın etkinlikler
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  // Etkinlikler sayfası: hepsi + filtre
  kategorileriDoldur();
  filtrele();
  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());
}