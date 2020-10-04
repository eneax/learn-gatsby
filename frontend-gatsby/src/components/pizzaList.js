import React from 'react';

import PizzaItem from './pizzaItem';

const PizzaList = ({ pizzas }) => (
  <div>
    {pizzas.map((pizza) => (
      <PizzaItem key={pizza.id} pizza={pizza} />
    ))}
  </div>
);

export default PizzaList;
