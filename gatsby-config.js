require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "film52",
    },
    plugins: [
        "gatsby-plugin-webpack-bundle-analyser-v2",
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        "gatsby-plugin-graphql-config",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "G-1D0PQ6V83X",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_DELIVERY_API,
                host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com'
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `GatsbyJS`,
                short_name: `GatsbyJS`,
                start_url: `/`,
                background_color: `#000000`,
                theme_color: `#000000`,
                display: `standalone`,
                icon: `./src/images/icon.png`
            },
        },
    ]
};
