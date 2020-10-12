import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

import SEO from '../components/seo';

// styles
const OrderStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;

    &.order,
    &.menu {
      grid-column: span 1;
    }
  }

  /* @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
`;

const MenuItemStyled = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;

  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }

  p {
    margin: 0;
  }

  button {
    font-size: 1.5rem;
  }
  button + button {
    margin-left: 1rem;
  }

  .remove {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    box-shadow: none;
    color: var(--red);
    font-size: 3rem;
    line-height: 1rem;
  }
`;

// query
export const OrderPizzasQuery = graphql`
  query OrderPizzasQuery {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const OrderPage = ({ data }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order a Pizza!" />

      <OrderStyled>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>

        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map(({ id, name, image, price }) => (
            <MenuItemStyled key={id}>
              <Img
                fluid={image.asset.fluid}
                alt={name}
                width="50"
                height="50"
              />
              <div>
                <h2>{name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type="button">
                    {size} {formatMoney(calculatePizzaPrice(price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyled>
          ))}
        </fieldset>

        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </OrderStyled>
    </>
  );
};

export default OrderPage;
