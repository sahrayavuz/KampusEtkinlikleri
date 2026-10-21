import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
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
          <a
            className="dugme"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            ← Listeye dön
          </a>
          <a
            className="dugme"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onEdit(event.id);
            }}
          >
            Bu etkinliği güncelle
          </a>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;