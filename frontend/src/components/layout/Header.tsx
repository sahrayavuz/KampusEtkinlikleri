import { useEffect } from "react";
import Navigation from "./Navigation";

type Props = { title: string; text?: string };

export default function Header({ title, text }: Props) {
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p className="alt-baslik">{text}</p>}
      <Navigation />
    </header>
  );
}