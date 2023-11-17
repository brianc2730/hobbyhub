import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header id="navbar">
      <h1>NBA Hub</h1>
      <input type="text" name="search" placeholder="Search"></input>
      <div id="navbar-right">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/create" className="link">
          Create A Post
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
