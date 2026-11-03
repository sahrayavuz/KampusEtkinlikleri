import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Header title="Şifremi Unuttum" />
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <div className="alan">
            <label htmlFor="email">E-posta</label>
            <input id="email" type="email" required />
          </div>
          <button type="submit">Sıfırlama bağlantısı gönder</button>
        </form>
        {sent && (
          <p className="mesaj">Gerçek şifre sıfırlama Sprint 10'da eklenecek.</p>
        )}
        <p><Link to="/login">← Girişe dön</Link></p>
      </main>
    </>
  );
}