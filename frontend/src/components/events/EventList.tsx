import type { CampusEvent } from "../../types/campus-events";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

function EventList({
  events,
  onShowDetail,
  emptyText = "Etkinlik bulunamadı.",
}: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }
  return (
    <section className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </section>
  );
}

export default EventList;