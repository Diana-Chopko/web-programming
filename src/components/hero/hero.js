import React from 'react';
import './hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Dream Car</h1>
        <p>The best deals on sports, family, and classic cars</p>
        <button className="hero-btn">View Catalog</button>
      </div>
    </section>
  );
};

export default Hero;