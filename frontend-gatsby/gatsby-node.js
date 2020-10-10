import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/pizzaTemplate.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // 3. Loop over each topping and create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });

  // 4. Pass toppings data to pizzaTemplate
}

// Create pages dynamically
export async function createPages(params) {
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params), // 1. Pizzas
    turnToppingsIntoPages(params), // 2. Toppings
    // 3. Slicemasters
  ]);
}
