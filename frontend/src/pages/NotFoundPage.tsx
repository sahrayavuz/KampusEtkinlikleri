import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header title="Sayfa bulunamadı" />
      <main>
        <div className="hata-kutusu">
          <p>Aradığınız sayfa bulunamadı.</p>
        </div>
        <Link className="dugme" to="/">← Ana sayfaya dön</Link>
      </main>
    </>
  );
}