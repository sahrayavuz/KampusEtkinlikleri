# Kampüs Etkinlikleri API (Sprint 8)

Express ve Mongoose ile yazılmış REST API. Veriler MongoDB'de tutulur, sunucu yeniden başlasa bile kalıcıdır.

## Çalıştırma

```bash
cd backend
npm install
npm run seed
npm run dev
```

Sunucu http://localhost:3000 adresinde çalışır. `npm run seed` veritabanını örnek 6 etkinlikle doldurur (her çalıştırmada önce siler, sonra ekler).

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayın ve değerleri kendi bilgilerinizle doldurun.

| Değişken | Anlamı |
|---|---|
| PORT | Sunucunun dinleyeceği port (varsayılan 3000) |
| MONGODB_URI | MongoDB bağlantı adresi (gerçek adres sadece `.env` dosyasında durur, repoya girmez) |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir | 200 | - | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` sunucunun ayakta olduğunu gösterir (200, `status`, `time`, `student`).

`id` artık MongoDB'nin verdiği `_id` değeridir (örn. `6af57a00...`). Geçersiz ya da olmayan id 404 döner.

## Status kodları

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok
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
- `src/models/event-model.js`: Event schema ve modeli
- `src/routes/event-routes.js`: hangi adres hangi fonksiyona gider
- `src/controllers/event-controller.js`: isteği işler, modeli kullanır, yanıtı döndürür
- `src/data/seed-events.js`: örnek 6 etkinlik
- `src/seed.js`: örnek veriyi veritabanına yükleyen script
- `requests/kampus-api.json`: Postman collection (6 istek)
