import { MdLocalPizza as pizzaIcon } from 'react-icons/md';

export default {
  // Computer name
  name: 'pizza',
  // Visible title
  title: 'Pizzas',
  type: 'document',
  icon: pizzaIcon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the Pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000), // price between 10$ and 50$
      // TODO: Add custom input component
    },
  ],
};
