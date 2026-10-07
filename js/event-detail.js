import { events } from "./data.js";

const baslik = document.querySelector("#sayfa-baslik");
const container = document.querySelector("#detay");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <div class="hata-kutusu" id="hata-metni"></div>
    <a class="buton" href="etkinlikler.html">← Listeye dön</a>`;
  document.querySelector("#hata-metni").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";
} else {
  const tarih = new Date(event.date + "T00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.title = event.title;
  baslik.textContent = event.title;
  container.innerHTML = `
    <section class="kunye">
      <h2>Etkinlik Künyesi</h2>
      <dl>
        <dt>Tarih</dt><dd>${tarih}, ${event.time}</dd>
        <dt>Yer</dt><dd>${event.location}</dd>
        <dt>Kategori</dt><dd>${event.category}</dd>
        <dt>Kontenjan</dt><dd>${event.capacity ? event.capacity + " kişi" : "-"}</dd>
      </dl>
    </section>
    <h2>Açıklama</h2>
    <p>${event.description}</p>
    <p>
      <a class="buton" href="etkinlikler.html">← Listeye dön</a>
      <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </p>`;
}