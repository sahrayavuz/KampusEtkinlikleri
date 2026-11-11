# Kampüs Etkinlikleri API (Sprint 7)

Express ile yazılmış REST API. Veriler şimdilik bellekte tutulur, sunucu yeniden başlayınca POST ile eklenen kayıtlar silinir.

## Çalıştırma

```bash
cd backend
npm install
npm run dev
```

Sunucu http://localhost:3000 adresinde çalışır.

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayın.

| Değişken | Anlamı |
|---|---|
| PORT | Sunucunun dinleyeceği port (varsayılan 3000) |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir | 200 | - | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` sunucunun ayakta olduğunu gösterir (200, `status`, `time`, `student`).

## Status kodları

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok
- 400 eksik ya da yanlış veri
- 404 bulunamadı

## Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Klasör yapısı

- `src/app.js`: Express uygulaması, middleware ve route'ları bağlar
- `src/server.js`: .env'i okur, portu dinler
- `src/routes/event-routes.js`: hangi adres hangi fonksiyona gider
- `src/controllers/event-controller.js`: isteği işler, yanıtı döndürür
- `src/data/events.js`: bellek içi etkinlik dizisi
- `requests/kampus-api.json`: Postman collection (6 istek)