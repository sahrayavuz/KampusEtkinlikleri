import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

export default function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p>
        <span className="etiket">{event.category}</span>
      </p>
      <p>Tarih: {formatDate(event.date, event.time)}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`}>Detayları gör</Link>
    </article>
  );
}