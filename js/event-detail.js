import { events } from "./data.js";

const container = document.querySelector("#detay");
const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

function tarihYaz(tarih, saat) {
  const gun = new Date(`${tarih}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${gun}, ${saat}`;
}

if (!etkinlik) {
  document.title = "Etkinlik bulunamadı";
  container.innerHTML = `
    <h1>Etkinlik bulunamadı</h1>
    <div class="hata-kutusu"><p id="hata-metin"></p></div>
    <p><a class="dugme" href="etkinlikler.html">← Listeye dön</a></p>`;
  document.querySelector("#hata-metin").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";
} else {
  document.title = etkinlik.title;
  container.innerHTML = `
    <h1>${etkinlik.title}</h1>
    <article class="detay">
      <figure>
        <img src="afis.jpg" alt="${etkinlik.title} etkinlik afişi">
        <figcaption>${etkinlik.title} afişi</figcaption>
      </figure>
      <div>
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>${tarihYaz(etkinlik.date, etkinlik.time)}</dd>
          <dt>Yer</dt>
          <dd>${etkinlik.location}</dd>
          <dt>Kategori</dt>
          <dd>${etkinlik.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${etkinlik.capacity} kişi</dd>
        </dl>
        <h2>Açıklama</h2>
        <p>${etkinlik.description}</p>
        <div class="dugme-grup">
          <a class="dugme" href="etkinlikler.html">← Listeye dön</a>
          <a class="dugme" href="etkinlik-guncelle.html?id=${etkinlik.id}">Bu etkinliği güncelle</a>
        </div>
      </div>
    </article>`;
}