import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const SlicemasterTemplate = ({ data: { person } }) => (
  <div className="center">
    <Img fluid={person.image.asset.fluid} />
    <h2>
      <span className="mark">{person.name}</span>
    </h2>
    <p>{person.description}</p>
  </div>
);

export default SlicemasterTemplate;

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
