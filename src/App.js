import React from 'react';
import Header from './components/header/header';
import Hero from './components/hero/hero';
import FeaturedCars from './components/featured_cars/featured_cars';
import Footer from './components/footer/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FeaturedCars />
      <Footer />
    </div>
  );
}

export default App;