import type { Category } from "../../types/campus-events";

interface EventFormProps {
  onSubmit: () => void;
  submitLabel?: string;
}

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ onSubmit, submitLabel = "Kaydet" }: EventFormProps) {
  return (
    <>
      <p className="not">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="alan">
          <label htmlFor="title">Etkinlik Adı</label>
          <input
            id="title"
            type="text"
            maxLength={80}
            placeholder="Örn. Kariyer Günleri 2026"
          />
        </div>
        <div className="alan">
          <label htmlFor="category">Kategori</label>
          <select id="category" defaultValue="">
            <option value="">Seçiniz</option>
            {formCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="alan">
          <label htmlFor="date">Tarih</label>
          <input id="date" type="date" />
        </div>
        <div className="alan">
          <label htmlFor="time">Saat</label>
          <input id="time" type="time" />
        </div>
        <div className="alan">
          <label htmlFor="location">Yer</label>
          <input
            id="location"
            type="text"
            placeholder="Örn. A Blok Konferans Salonu"
          />
        </div>
        <div className="alan">
          <label htmlFor="capacity">Kontenjan</label>
          <input id="capacity" type="number" min={1} max={1000} />
        </div>
        <div className="alan">
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" rows={5} />
        </div>
        <button type="submit">{submitLabel}</button>
      </form>
    </>
  );
}

export default EventForm;