import React from 'react';
import CarCard from '../car_card/car_card';
import './featured_cars.css';

const FeaturedCars = () => {
  const cars = [
    { id: 1, brand: 'Tesla', model: 'Model S', price: '79,990', image: '/images/tesla_model_s.jpg' },
    { id: 2, brand: 'BMW', model: 'M5 Competition', price: '105,000', image: '/images/bmw_m5_competition.jpg' },
    { id: 3, brand: 'Audi', model: 'RS e-tron GT', price: '104,900', image: '/images/audi_rs_etron_gt.jpg' }
  ];

  return (
    <section className="featured-cars">
      <h2>Top models</h2>
      <div className="car-grid">
        {cars.map(car => (
          <CarCard 
            key={car.id} 
            brand={car.brand} 
            model={car.model} 
            price={car.price} 
            image={car.image} 
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;