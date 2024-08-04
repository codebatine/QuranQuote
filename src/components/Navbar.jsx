import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/readquran" className="nav-link">Read Quran</Link>
    </nav>
  );
};

export default Navbar;
