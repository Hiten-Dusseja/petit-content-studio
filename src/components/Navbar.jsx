import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/create', label: 'New Project' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <img
            src="https://petittheatingandcooling.com/wp-content/uploads/2025/12/petitt-new-brand-words_whitebkgd-3-150x150.png"
            alt="Petitt Heating & Cooling"
            className="navbar-logo"
          />
          <span className="navbar-product">Content Studio</span>
        </Link>
        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}