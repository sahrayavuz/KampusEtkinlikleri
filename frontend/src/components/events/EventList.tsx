import type { CampusEvent } from "../../types/campus-events";
import EventCard from "./EventCard";

export default function EventList({ events }: { events: CampusEvent[] }) {
  return (
    <section className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}