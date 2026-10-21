interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p className="alt-baslik">{text}</p>}
    </header>
  );
}

export default Header;