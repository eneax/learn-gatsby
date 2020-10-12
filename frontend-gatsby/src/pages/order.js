import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

import SEO from '../components/seo';

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

      <form>
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

        <fieldset>
          <legend>Menu</legend>
          {pizzas.map(({ id, name, image, price }) => (
            <div key={id}>
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
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
};

export default OrderPage;
