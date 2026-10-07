import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];
const guncelleme = form.dataset.mode === "guncelle";

const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

function formuDoldur() {
  form.elements.ad.value = etkinlik.title;
  form.elements.kategori.value = etkinlik.category;
  form.elements.tarih.value = etkinlik.date;
  form.elements.saat.value = etkinlik.time;
  form.elements.yer.value = etkinlik.location;
  form.elements.kontenjan.value = etkinlik.capacity ?? "";
  form.elements.aciklama.value = etkinlik.description;
}

function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }
  return errors;
}

function hatalariGoster(errors) {
  alanlar.forEach((ad) => {
    const hataYeri = document.querySelector(`#${ad}-hata`);
    const alan = form.elements[ad];
    if (errors[ad]) {
      hataYeri.textContent = errors[ad];
      alan.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      alan.removeAttribute("aria-invalid");
    }
  });
}

function gonder(e) {
  e.preventDefault();

  const fd = new FormData(form);
  const kontenjanHam = fd.get("kontenjan").trim();

  const data = {
    id: guncelleme ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjanHam === "" ? null : Number(kontenjanHam),
    description: fd.get("aciklama").trim(),
  };

  const errors = dogrula(data);
  hatalariGoster(errors);

  if (Object.keys(errors).length > 0) {
    mesaj.className = "mesaj-hata";
    mesaj.textContent = "Formda hatalı alanlar var.";
    return;
  }

  mesaj.className = "mesaj-basari";
  mesaj.textContent = guncelleme
    ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
    : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(data, null, 2);
  mesaj.append(pre);
}

if (guncelleme && !etkinlik) {
  // id yok ya da geçersiz: form yerine uyarı
  form.outerHTML = `
    <div class="hata-kutusu">
      Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
      detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
    </div>
    <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
} else {
  if (guncelleme) formuDoldur();
  form.addEventListener("submit", gonder);
}