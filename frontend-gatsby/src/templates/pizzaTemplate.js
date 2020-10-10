import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

// styles
const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
`;

// query
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

const PizzaTemplate = ({ data: { pizza } }) => {
  const { name, image, toppings } = pizza;

  return (
    <PizzaGrid>
      <Img fluid={image.asset.fluid} />
      <div>
        <h2 className="mark">{name}</h2>
        <ul>
          {toppings.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
};

export default PizzaTemplate;
