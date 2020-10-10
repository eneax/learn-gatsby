import React from 'react';
import { graphql } from 'gatsby';

import ToppingsFilter from '../components/toppingsFilter';
import PizzaList from '../components/pizzaList';

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export default PizzasPage;

export const pizzasQuery = graphql`
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

// export const PizzaQuery = graphql`
//   query PizzaQuery($toppingRegex: String) {
//     pizzas: allSanityPizza(
//       filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
//     ) {
//       nodes {
//         name
//         id
//         slug {
//           current
//         }
//         toppings {
//           id
//           name
//         }
//         image {
//           asset {
//             fixed(width: 600, height: 200) {
//               ...GatsbySanityImageFixed
//             }
//             fluid(maxWidth: 400) {
//               ...GatsbySanityImageFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `;
