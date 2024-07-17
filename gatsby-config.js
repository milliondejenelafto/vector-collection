module.exports = {
  siteMetadata: {
    title: "Vector Collection",
    description: "A platform for collecting and sharing cultural vector graphics.",
    author: "@kitila",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `vectors`,
        path: `${__dirname}/src/assets/vectors`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `vector-collection`,
        short_name: `vcollection`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`,
      },
    },
  ],
}
