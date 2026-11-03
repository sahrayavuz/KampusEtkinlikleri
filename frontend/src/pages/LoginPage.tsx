import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

export default function LoginPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Header title="Giriş Yap" />
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <div className="alan">
            <label htmlFor="email">E-posta</label>
            <input id="email" type="email" required />
          </div>
          <div className="alan">
            <label htmlFor="password">Şifre</label>
            <input id="password" type="password" required />
          </div>
          <button type="submit">Giriş yap</button>
        </form>
        {sent && (
          <p className="mesaj">Gerçek giriş Sprint 10'da eklenecek.</p>
        )}
        <p>
          <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
          {" · "}
          <Link to="/forgot-password">Şifremi unuttum</Link>
        </p>
      </main>
    </>
  );
}