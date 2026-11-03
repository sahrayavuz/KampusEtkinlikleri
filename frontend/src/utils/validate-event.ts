import type { EventFormData, EventFormErrors } from "../types/campus-events";

export const emptyEventForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

const BOS = "Bu alanı boş bırakamazsınız.";

export function validateEvent(d: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (!d.title.trim()) errors.title = BOS;
  else if (d.title.trim().length < 3)
    errors.title = "Etkinlik adı en az 3 karakter olmalı.";

  if (!d.category) errors.category = "Lütfen bir kategori seçin.";
  if (!d.date) errors.date = BOS;
  if (!d.time) errors.time = BOS;
  if (!d.location.trim()) errors.location = BOS;

  const cap = Number(d.capacity);
  if (!d.capacity) errors.capacity = BOS;
  else if (!Number.isInteger(cap) || cap < 1 || cap > 1000)
    errors.capacity = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";

  if (!d.description.trim()) errors.description = BOS;
  else if (d.description.trim().length < 10)
    errors.description = "Açıklama en az 10 karakter olmalı.";

  return errors;
}