import React from 'react';
import './car_card.css';

const CarCard = ({ brand, model, price, image }) => {
  return (
    <div className="car-card">
      <img src={image} alt={`${brand} ${model}`} className="car-image" />
      <h3>{brand} {model}</h3>
      <p className="price">${price}</p>
      <button className="details-btn">Read more</button>
    </div>
  );
};

export default CarCard;