export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  image?: string;
}
export type EventFormData = {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
};

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;