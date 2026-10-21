import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-events";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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

  return (
    <>
      <Header title={title} text={subtitles[page]} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a
                className="tum-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
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
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            submitLabel={page === "add" ? "Kaydet" : "Güncelle"}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;