import React from 'react';
import { Link } from 'gatsby';

const PizzaItem = ({ pizza }) => (
  <div>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      {pizza.toppings.map((topping) => topping.name).join(', ')}
    </Link>
  </div>
);

export default PizzaItem;
