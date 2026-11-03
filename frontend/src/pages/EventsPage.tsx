import { useState } from "react";
import Header from "../components/layout/Header";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-events";
import { filterByCategory, searchEvents } from "../utils/filter-events";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <Header
        title="Tüm Etkinlikler"
        text="Kampüste düzenlenen etkinlikler."
      />
      <main>
        <EventFilter
          searchText={searchText}
          category={category}
          categories={categories}
          onSearchChange={setSearchText}
          onCategoryChange={setCategory}
        />
        <p id="sonuc">
          {filtered.length === 0
            ? "Aramanıza uygun etkinlik bulunamadı."
            : `${filtered.length} etkinlik listeleniyor.`}
        </p>
        <EventList events={filtered} />
      </main>
    </>
  );
}