import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

export default function RegisterPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Header title="Kayıt Ol" />
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <div className="alan">
            <label htmlFor="ad">Ad Soyad</label>
            <input id="ad" type="text" required />
          </div>
          <div className="alan">
            <label htmlFor="email">E-posta</label>
            <input id="email" type="email" required />
          </div>
          <div className="alan">
            <label htmlFor="password">Şifre</label>
            <input id="password" type="password" minLength={6} required />
          </div>
          <div className="alan">
            <label htmlFor="password2">Şifre (tekrar)</label>
            <input id="password2" type="password" minLength={6} required />
          </div>
          <button type="submit">Kayıt ol</button>
        </form>
        {sent && (
          <p className="mesaj">Gerçek kayıt Sprint 10'da eklenecek.</p>
        )}
        <p><Link to="/login">Zaten hesabın var mı? Giriş yap</Link></p>
      </main>
    </>
  );
}