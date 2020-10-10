import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

// styles
const ToppingsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }

    .active {
      background: var(--yellow);
    }
  }
`;

const countPizzasInToppings = (pizzas) => {
  // Return the pizzas with count
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    // merge multiple arrays into one big array
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];

      // if it is, increment by 1
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  // sort toppings based on count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
};

const ToppingsFilter = () => {
  // Get a list of all Pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
            vegetarian
          }
        }
      }
    }
  `);

  // Count how many pizzas are in each topping
  const toppingsWithCount = countPizzasInToppings(pizzas.nodes);

  return (
    <ToppingsStyled>
      {toppingsWithCount.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyled>
  );
};

export default ToppingsFilter;
