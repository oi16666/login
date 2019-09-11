import React from 'react';
import {Link} from '@reach/router';


class Navbar extends React.Component {
    render() {
       return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="#">Psycharmor</a>
  <div className="collapse navbar-collapse" id="navbarColor01">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link"to="/">Home </Link>
      </li>
      <li className="nav-item">
         <Link className="nav-link"to="/login">Login </Link>
      </li>
      <li className="nav-item">
         <Link className="nav-link"to="/login">Logout </Link>
      </li>
    </ul>
   
  </div>
</nav>
       );
    }
}

export default Navbar;
