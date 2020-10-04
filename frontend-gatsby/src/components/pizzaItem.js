import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaStyled = styled.div`
  display: grid;

  /* if subgrid is not supported in the browser, use grid-template-rows  */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  /* Take your sizing from the PizzaGridStyled, not from PizzaStyled */
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

const PizzaItem = ({ pizza }) => (
  <PizzaStyled>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    {pizza.toppings.map((topping) => topping.name).join(', ')}
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </PizzaStyled>
);

export default PizzaItem;
