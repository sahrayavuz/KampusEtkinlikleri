# Kampüs Etkinlikleri API (Sprint 9)

Express ve Mongoose ile yazılmış REST API. Veriler MongoDB'de tutulur. Bu sprintte tam CRUD (ekle, listele, güncelle, sil), arama/filtre ve yaklaşan etkinlikler eklendi.

## Çalıştırma

```bash
cd backend
npm install
npm run seed
npm run dev
```

Sunucu http://localhost:3000 adresinde çalışır. `npm run seed` veritabanını örnek 6 etkinlikle doldurur (her çalıştırmada önce siler, sonra ekler). Seed'deki 2 etkinlik geçmiş, 4 etkinlik gelecek bir tarihlidir (tarihler bugüne göre hesaplanır).

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayın ve değerleri kendi bilgilerinizle doldurun.

| Değişken | Anlamı |
|---|---|
| PORT | Sunucunun dinleyeceği port (varsayılan 3000) |
| MONGODB_URI | MongoDB bağlantı adresi (gerçek adres sadece `.env` dosyasında durur, repoya girmez) |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | - | Çalışıyor |
| GET | /events | Listeyi getir (`?search=` ve `?category=` ile süzülür) | 200 | - | Çalışıyor |
| GET | /events/upcoming | Bugün ve sonrası, tarihe göre sıralı | 200 | - | Çalışıyor |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | Çalışıyor |
| PATCH | /events/:id | Sadece gönderilen alanları güncelle | 200 | 400, 404 | Çalışıyor |
| DELETE | /events/:id | Sil (gövde yok) | 204 | 404 | Çalışıyor |

Örnekler:

- `GET /events?search=git` başlığında "git" geçenler (büyük/küçük harf fark etmez)
- `GET /events?category=Atölye` sadece atölyeler
- `GET /events?search=git&category=Atölye` ikisi birlikte
- `PATCH /events/<_id>` gövde: `{ "capacity": 55 }`

## Tarih biçimi

API'de tarih her yerde `GG-AA-YYYY` biçimindedir (örn. `"15-10-2026"`). Veritabanında gerçek `Date` olarak saklanır, böylece sıralama ve `$gte` karşılaştırması doğru çalışır. Dönüşümü `src/utils/date.js` yapar. Yanlış biçim (`2026-12-20`) ya da olmayan gün (`31-02-2026`) 400 döner.

## PATCH kuralları

- Gövde boşsa: 400 `Body is empty`
- `_id`, `createdAt`, `updatedAt`, `__v` değiştirilemez: 400
- Geçersiz kategori ya da tarih gibi schema hataları: 400 (`runValidators`)
- Güncellenmiş kayıt döner (`returnDocument: "after"`)

`id` MongoDB'nin verdiği `_id` değeridir. Geçersiz ya da olmayan id her yerde 404 döner.

## Status kodları

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok (silme)
- 400 eksik ya da yanlış veri
- 404 bulunamadı
- 500 beklenmeyen sunucu hatası

## Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Klasör yapısı

- `src/app.js`: Express uygulaması, middleware ve route'ları bağlar, hata yakalayıcı en sonda
- `src/server.js`: .env'i okur, önce veritabanına bağlanır, sonra portu dinler
- `src/config/database.js`: MongoDB bağlantısı
- `src/utils/date.js`: `GG-AA-YYYY` ile `Date` arasında dönüşüm, bugünün başı
- `src/models/event-model.js`: Event schema ve modeli
- `src/routes/event-routes.js`: hangi adres hangi fonksiyona gider (sabit adres `/:id`'den önce)
- `src/controllers/event-controller.js`: liste/arama, yaklaşan, tek, ekle, güncelle, sil
- `src/data/seed-events.js`: örnek 6 etkinlik (2 geçmiş, 4 gelecek)
- `src/seed.js`: örnek veriyi veritabanına yükleyen script
- `requests/kampus-api.json`: Postman collection (18 istek)
- `requests/run-results.json`: Collection Runner sonucu
