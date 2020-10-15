import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const attachNamesAndPrices = (order, pizzas) =>
  order.map((orderItem) => {
    const pizza = pizzas.find((pizzaItem) => pizzaItem.id === orderItem.id);

    return {
      ...orderItem,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, orderItem.size)),
    };
  });

export default attachNamesAndPrices;
