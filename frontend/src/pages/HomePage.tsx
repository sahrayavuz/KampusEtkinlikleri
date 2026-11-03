import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <Header
        title="Kampüs Etkinlikleri"
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      />
      <main>
        <h2>Yaklaşan 2 Etkinlik</h2>
        <EventList events={upcoming} />
        <p>
          <Link className="tum-link" to="/events">
            Tüm etkinlikleri gör →
          </Link>
        </p>
      </main>
    </>
  );
}