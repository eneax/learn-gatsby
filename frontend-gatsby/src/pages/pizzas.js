import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import ToppingsFilter from '../components/toppingsFilter';
import PizzaList from '../components/pizzaList';

// query
export const PizzasQuery = graphql`
  query PizzasQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
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

const PizzasPage = ({ data, pageContext }) => {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : `Pizza Menu`
        }
      />
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export default PizzasPage;
