import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/pizzaList';

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export default PizzasPage;

export const pizzasQuery = graphql`
  {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
