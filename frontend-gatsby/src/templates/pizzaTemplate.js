import React from 'react';
import { graphql } from 'gatsby';

const PizzaTemplate = ({ data: pizza }) => {
  console.log(pizza);

  return (
    <div>
      <p>Pizza Template</p>
    </div>
  );
};

export default PizzaTemplate;

export const SinglePizzaPageQuery = graphql`
  query SinglePizzaPageQuery($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        id
        name
        vegetarian
      }
    }
  }
`;
