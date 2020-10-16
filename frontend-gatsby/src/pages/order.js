import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import calculateOrderTotal from '../utils/calculateOrderTotal';

import MenuItemStyled from '../styles/menuItemStyled';
import SEO from '../components/seo';
import PizzaOrder from '../components/pizzaOrder';

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

    .mapleSyrup {
      display: none;
    }
  }

  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
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
  const pizzas = data.pizzas.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a Pizza!" />

      <OrderStyled onSubmit={submitOrder}>
        <fieldset disabled={loading}>
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
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            className="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
          />
        </fieldset>

        <fieldset className="menu" disabled={loading}>
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
                  <button
                    type="button"
                    key={size}
                    onClick={() => addToOrder({ id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyled>
          ))}
        </fieldset>

        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>

        <fieldset disabled={loading}>
          <legend>Total</legend>
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Ahead!'}
          </button>
        </fieldset>
      </OrderStyled>
    </>
  );
};

export default OrderPage;
