import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function ManageEventsPage() {
  const { events, deleteEvent } = useEvents();

  return (
    <>
      <Header title="Etkinlik Yönetimi" text="Etkinlikleri düzenleyin veya silin." />
      <main>
        <p>
          <Link className="dugme" to="/events/new">+ Yeni etkinlik</Link>
        </p>
        {events.length === 0 ? (
          <p className="mesaj">Henüz etkinlik yok.</p>
        ) : (
          <table className="tablo">
            <thead>
              <tr>
                <th>Ad</th>
                <th>Kategori</th>
                <th>Tarih</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td data-baslik="Ad">{e.title}</td>
                  <td data-baslik="Kategori">{e.category}</td>
                  <td data-baslik="Tarih">{formatDate(e.date, e.time)}</td>
                  <td data-baslik="İşlemler" className="islemler">
                    <Link className="buton" to={`/events/${e.id}`}>Detay</Link>
                    <Link className="buton" to={`/events/${e.id}/edit`}>Güncelle</Link>
                    <button
                      type="button"
                      className="buton buton-sil"
                      onClick={() => {
                        if (window.confirm(`"${e.title}" silinsin mi?`))
                          deleteEvent(e.id);
                      }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}