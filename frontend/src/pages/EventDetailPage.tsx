import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent } = useEvents();
  const event = id ? findEventById(events, id) : undefined;

  function handleDelete() {
    if (!event) return;
    if (window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
      deleteEvent(event.id);
      navigate("/events");
    }
  }

  if (!event) {
    return (
      <>
        <Header title="Etkinlik bulunamadı" />
        <main>
          <div className="hata-kutusu">
            <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
          </div>
          <Link className="dugme" to="/events">← Listeye dön</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title={event.title} />
      <main>
        <EventDetail event={event} onDelete={handleDelete} />
      </main>
    </>
  );
}