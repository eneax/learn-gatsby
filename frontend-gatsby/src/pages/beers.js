import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/seo';

// styles
const BeerGridStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyled = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

// query
export const BeersQuery = graphql`
  query BeersQuery {
    beers: allBeer {
      totalCount
      nodes {
        id
        name
        image
        price
        rating {
          reviews
          average
        }
      }
    }
  }
`;

const BeersPage = ({ data: { beers } }) => (
  <>
    <SEO title={`Beers! We have ${beers.totalCount} in stock!`} />

    <h2 className="center">
      We have {beers.totalCount} Beers available. Dine in only!
    </h2>

    <BeerGridStyled>
      {beers.nodes.map(({ id, name, image, price, rating }) => {
        const averageRating = Math.round(rating.average);

        return (
          <SingleBeerStyled key={id}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <span>{price}</span>
            <p title={`${averageRating} out of 5 stars`}>
              {`⭐`.repeat(averageRating)}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐`.repeat(5 - averageRating)}
              </span>
              <span>({rating.reviews})</span>
            </p>
          </SingleBeerStyled>
        );
      })}
    </BeerGridStyled>
  </>
);

export default BeersPage;
