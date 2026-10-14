import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { CampusEvent, Category } from "./types/campus-events";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function formatDate(date: string, time?: string): string {
  const day = new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return time ? `${day}, ${time}` : day;
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const subtitles: Partial<Record<PageName, string>> = {
    home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    events: "Ekim ayında kampüste düzenlenen etkinlikler.",
  };
  const title = titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function navigate(
    e: MouseEvent<HTMLAnchorElement>,
    next: PageName,
    id: string | null = null
  ) {
    e.preventDefault();
    go(next, id);
  }

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p>
          <span className="etiket">{event.category}</span>
        </p>
        <p>Tarih: {formatDate(event.date, event.time)}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={(e) => navigate(e, "detail", event.id)}>
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {subtitles[page] && <p className="alt-baslik">{subtitles[page]}</p>}
        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => navigate(e, item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <a
                className="tum-link"
                href="#"
                onClick={(e) => navigate(e, "events")}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <div className="filtre">
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu">
              <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            </div>
            <a
              className="dugme"
              href="#"
              onClick={(e) => navigate(e, "events")}
            >
              ← Listeye dön
            </a>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}
            <div>
              <div className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>{formatDate(selected.date, selected.time)}</dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </div>
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <div className="dugme-grup">
                <a
                  className="dugme"
                  href="#"
                  onClick={(e) => navigate(e, "events")}
                >
                  ← Listeye dön
                </a>
                <a
                  className="dugme"
                  href="#"
                  onClick={(e) => navigate(e, "update", selected.id)}
                >
                  Bu etkinliği güncelle
                </a>
              </div>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="not">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </div>
              <div className="alan">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {formCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="alan">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>
              <div className="alan">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>
              <div className="alan">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>
              <div className="alan">
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" min={1} max={1000} />
              </div>
              <div className="alan">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>
              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer className="site-alt">
        <p>Sahra YAVUZ · 2321032034 · 2026</p>
      </footer>
    </>
  );
}

export default App;