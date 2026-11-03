/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type {
  CampusEvent,
  Category,
  EventFormData,
} from "../types/campus-events";

type EventsContextValue = {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => CampusEvent;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
};

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, d: EventFormData): CampusEvent {
  return {
    id,
    title: d.title.trim(),
    category: d.category as Category,
    date: d.date,
    time: d.time,
    location: d.location.trim(),
    capacity: Number(d.capacity),
    description: d.description.trim(),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    const created = toEvent(`event-${Date.now()}`, data);
    setEvents((prev) => [...prev, created]);
    return created;
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...toEvent(id, data) } : e))
    );
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  return ctx;
}