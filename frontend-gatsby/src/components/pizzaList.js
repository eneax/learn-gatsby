import React from 'react';
import styled from 'styled-components';

import PizzaItem from './pizzaItem';

const PizzaGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px; /* title, topping, image */
`;

const PizzaList = ({ pizzas }) => (
  <PizzaGridStyled>
    {pizzas.map((pizza) => (
      <PizzaItem key={pizza.id} pizza={pizza} />
    ))}
  </PizzaGridStyled>
);

export default PizzaList;
