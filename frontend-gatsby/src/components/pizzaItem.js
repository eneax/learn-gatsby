import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const PizzaItem = ({ pizza }) => (
  <div>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      {pizza.toppings.map((topping) => topping.name).join(', ')}
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </Link>
  </div>
);

export default PizzaItem;
