import calculatePizzaPrice from './calculatePizzaPrice';

// Loop over each item in the order, calculate the total for that pizza and add that total to the running total
const calculateOrderTotal = (order, pizzas) =>
  order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );

    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
export default calculateOrderTotal;
