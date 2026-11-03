import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/events/new", label: "Ekle" },
  { to: "/manage", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

export default function Navigation() {
  return (
    <nav className="menu">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}