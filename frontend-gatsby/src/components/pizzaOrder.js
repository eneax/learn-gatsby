import React from 'react';
import Img from 'gatsby-image';

import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

import MenuItemStyled from '../styles/menuItemStyled';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <div>
    {order.map((singleOrder, index) => {
      const pizza = pizzas.find(
        (singlePizza) => singlePizza.id === singleOrder.id
      );

      return (
        <MenuItemStyled key={singleOrder.id}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{pizza.name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            <button
              type="button"
              className="remove"
              title={`Remove ${singleOrder.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </p>
        </MenuItemStyled>
      );
    })}
  </div>
);

export default PizzaOrder;
