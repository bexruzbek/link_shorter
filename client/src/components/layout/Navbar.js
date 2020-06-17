import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LinkContext from '../../context/link/linkContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const linkContext = useContext(LinkContext);

  const { isAuthenticated, logout } = authContext;
  const { clearLinks } = linkContext;

  const onLogout = () => {
    logout();
    clearLinks();
  }

  const authLinks =  (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/create"><i class="fas fa-plus"></i> Создать ссылку</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/links"><i class="far fa-list-alt"></i> Список</Link>
      </li>
      <li className="nav-item">
        <a href="#!" className="nav-link" onClick={onLogout}><i className="fas fa-sign-out-alt" />{' '}Выйти</a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Войти</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Регистрация</Link>
      </li>
    </Fragment>
  )
  
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm bg-info navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item active mr-3">
             <Link className="nav-link" to="/"> <i className="fas fa-meteor"></i> Link shorter</Link>
          </li>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navbar