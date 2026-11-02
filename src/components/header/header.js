import React from 'react';
import './header.css';
import logoImage from './logo.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="AutoShop Logo" className="logo-img" />
        <span>AutoShop</span>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/catalog">Catalog</a></li>
          <li><a href="/cart">Cart</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;