import { useContext } from 'react';

import OrderContext from '../components/orderContext';

const usePizza = ({ pizzas, inputs }) => {
  // Access state and updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  // Make a function to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // Make a function to remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  };
  // TODO: Send this data to a serverless function when they check out

  return { order, addToOrder, removeFromOrder };
};

export default usePizza;
