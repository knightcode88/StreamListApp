import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'StreamList', icon: 'queue_music', position: 'left' },
  { path: '/movies', label: 'Movies', icon: 'movie', position: 'left' },
  { path: '/cart', label: 'Cart', icon: 'shopping_cart', position: 'right' },
  { path: '/about', label: 'About', icon: 'info', position: 'right' },
];

export default function Navbar() {
  const leftLinks = navLinks.filter(link => link.position === 'left');
  const rightLinks = navLinks.filter(link => link.position === 'right');

  return (
    <nav>
      <div className="left-links">
        {leftLinks.map(link => (
          <NavLink key={link.path} to={link.path} end>
            <span className="material-symbols-outlined">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="right-links">
        {rightLinks.map(link => (
          <NavLink key={link.path} to={link.path}>
            <span className="material-symbols-outlined">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}