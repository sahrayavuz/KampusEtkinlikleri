import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type {
  Category,
  EventFormData,
  EventFormErrors,
} from "../../types/campus-events";
import { emptyEventForm, validateEvent } from "../../utils/validate-event";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

type Props = {
  initialData?: EventFormData;
  submitLabel: string;
  onSubmit: (data: EventFormData) => void;
};

export default function EventForm({
  initialData = emptyEventForm,
  submitLabel,
  onSubmit,
}: Props) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  function err(name: keyof EventFormData) {
    return errors[name] ? (
      <p className="hata-metni" id={`${name}-hata`}>
        {errors[name]}
      </p>
    ) : null;
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="alan">
        <label htmlFor="title">Etkinlik Adı</label>
        <input id="title" name="title" type="text" maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          value={data.title} onChange={handleChange}
          aria-invalid={errors.title ? true : undefined} />
        {err("title")}
      </div>
      <div className="alan">
        <label htmlFor="category">Kategori</label>
        <select id="category" name="category" value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}>
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {err("category")}
      </div>
      <div className="alan">
        <label htmlFor="date">Tarih</label>
        <input id="date" name="date" type="date" value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined} />
        {err("date")}
      </div>
      <div className="alan">
        <label htmlFor="time">Saat</label>
        <input id="time" name="time" type="time" value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined} />
        {err("time")}
      </div>
      <div className="alan">
        <label htmlFor="location">Yer</label>
        <input id="location" name="location" type="text"
          placeholder="Örn. A Blok Konferans Salonu"
          value={data.location} onChange={handleChange}
          aria-invalid={errors.location ? true : undefined} />
        {err("location")}
      </div>
      <div className="alan">
        <label htmlFor="capacity">Kontenjan</label>
        <input id="capacity" name="capacity" type="number" min={1} max={1000}
          value={data.capacity} onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined} />
        {err("capacity")}
      </div>
      <div className="alan">
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={5}
          value={data.description} onChange={handleChange}
          aria-invalid={errors.description ? true : undefined} />
        {err("description")}
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}