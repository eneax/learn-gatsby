import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyled = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SlicemastersPage = ({ data }) => {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <SlicemasterGrid>
        {slicemasters.map(({ id, slug, name, image, description }) => (
          <SlicemasterStyled key={id}>
            <Link to={`/slicemaster/${slug.current}`}>
              <h2>
                <span className="mark">{name}</span>
              </h2>
            </Link>

            <Img fluid={image.asset.fluid} />
            <p className="description">{description}</p>
          </SlicemasterStyled>
        ))}
      </SlicemasterGrid>
    </>
  );
};

export default SlicemastersPage;

export const SlicemastersQuery = graphql`
  query SlicemastersQuery {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        id
        slug {
          current
        }
        name
        description
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
