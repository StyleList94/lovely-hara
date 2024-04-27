import Link from 'next/link';

const Header = () => (
  <header className="fixed w-full bg-base-100">
    <nav className="navbar bg-base-100">
      <div className="navbar-start" />
      <div className="navbar-center">
        <Link
          href="/"
          className="btn btn-ghost text-2xl no-animation font-display font-medium"
        >
          StyleList94
        </Link>
      </div>
      <div className="navbar-end" />
    </nav>
  </header>
);

export default Header;
