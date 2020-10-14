import { useState } from 'react';

const usePizza = ({ pizzas, inputs }) => {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. Make a function to remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  };
  // TODO: 4. Send this data to a serverless function when they check out

  return { order, addToOrder, removeFromOrder };
};

export default usePizza;
