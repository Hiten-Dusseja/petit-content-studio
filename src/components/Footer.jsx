import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-brand">Petitt Content Studio</span>
          <span className="footer-tagline">AI-powered content generation for Petitt Heating &amp; Cooling</span>
        </div>
        <div className="footer-right">
          <Link to="/" className="footer-link">Dashboard</Link>
          <Link to="/create" className="footer-link">New Project</Link>
        </div>
      </div>
    </footer>
  );
}