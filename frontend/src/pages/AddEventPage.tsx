import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const [saved, setSaved] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  return (
    <>
      <Header title="Etkinlik Ekle" />
      <main>
        {saved && (
          <p className="mesaj mesaj-basari">
            Etkinlik kaydedildi. <Link to={`/events/${saved}`}>Detayı gör</Link>
          </p>
        )}
        <EventForm
          key={formKey}
          submitLabel="Kaydet"
          onSubmit={(data) => {
            const created = addEvent(data);
            setSaved(created.id);
            setFormKey((k) => k + 1);
          }}
        />
      </main>
    </>
  );
}