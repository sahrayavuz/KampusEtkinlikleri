import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleMi = form.dataset.mode === "guncelle";
const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

const ALANLAR = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

function doldur(e) {
  form.elements.ad.value = e.title;
  form.elements.kategori.value = e.category;
  form.elements.tarih.value = e.date;
  form.elements.saat.value = e.time;
  form.elements.yer.value = e.location;
  form.elements.kontenjan.value = e.capacity;
  form.elements.aciklama.value = e.description;
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
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";
  }
  return errors;
}

function hatalariGoster(errors) {
  ALANLAR.forEach((alan) => {
    const hataYeri = document.querySelector(`#${alan}-hata`);
    const girdi = form.elements[alan];
    if (errors[alan]) {
      hataYeri.textContent = errors[alan];
      girdi.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      girdi.removeAttribute("aria-invalid");
    }
  });
}

function mesajYaz(tur, metin, data) {
  mesaj.replaceChildren();
  mesaj.className = `mesaj ${tur}`;
  const p = document.createElement("p");
  p.textContent = metin;
  mesaj.append(p);
  if (data) {
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(data, null, 2);
    mesaj.append(pre);
  }
}

function gonder(e) {
  e.preventDefault();
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();

  const data = {
    id: guncelleMi ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
    description: fd.get("aciklama").trim(),
  };

  const errors = dogrula(data);
  hatalariGoster(errors);

  if (Object.keys(errors).length > 0) {
    mesajYaz("hata", "Formda hatalı alanlar var.");
    return;
  }

  mesajYaz(
    "basari",
    guncelleMi
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):",
    data
  );
}

if (guncelleMi && !etkinlik) {
  form.outerHTML = `
    <div class="hata-kutusu">
      <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
    </div>
    <p><a class="dugme" href="etkinlikler.html">Etkinliklere git</a></p>`;
} else {
  if (guncelleMi) doldur(etkinlik);
  form.addEventListener("submit", gonder);
}