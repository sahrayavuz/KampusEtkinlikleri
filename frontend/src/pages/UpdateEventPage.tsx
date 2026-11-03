import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";

export default function UpdateEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();
  const event = id ? findEventById(events, id) : undefined;

  if (!event) {
    return (
      <>
        <Header title="Etkinlik bulunamadı" />
        <main>
          <div className="hata-kutusu">
            <p>Güncellenecek etkinlik bulunamadı.</p>
          </div>
          <Link className="dugme" to="/events">← Listeye dön</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Etkinlik Güncelle" />
      <main>
        <EventForm
          submitLabel="Güncelle"
          initialData={{
            title: event.title,
            category: event.category,
            date: event.date,
            time: event.time,
            location: event.location,
            capacity: String(event.capacity),
            description: event.description,
          }}
          onSubmit={(data) => {
            updateEvent(event.id, data);
            navigate(`/events/${event.id}`);
          }}
        />
      </main>
    </>
  );
}