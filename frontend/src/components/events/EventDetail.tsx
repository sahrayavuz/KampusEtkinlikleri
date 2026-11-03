import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

type Props = { event: CampusEvent; onDelete: () => void };

export default function EventDetail({ event, onDelete }: Props) {
  return (
    <article className="detay">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} afişi`} />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}
      <div>
        <div className="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>{formatDate(event.date, event.time)}</dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </div>
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <div className="dugme-grup">
          <Link className="dugme" to="/events">
            ← Listeye dön
          </Link>
          <Link className="dugme" to={`/events/${event.id}/edit`}>
            Bu etkinliği güncelle
          </Link>
          <button type="button" className="buton buton-sil" onClick={onDelete}>
            Sil
          </button>
        </div>
      </div>
    </article>
  );
}