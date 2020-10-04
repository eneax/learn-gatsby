const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `http://localhost:9000`,
    description: `The best pizza place in town!`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        // https://manage.sanity.io/
        projectId: 'xtvtsdcn',
        dataset: 'production',
        watchMode: true, // real time editing experience in dev mode
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
