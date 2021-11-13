exports.createPages = async ({actions: {createPage, graphql}}) => {
    const results = await graphql(`
        allContentfulFilm {
            edges {
              node {
                title
                createdAt
                filmmaker {
                  firstName
                  lastName
                }
                video {
                  playbackId
                }
                preview {
                  gatsbyImageData
                  file {
                    url
                  }
                }
              }
            }
        }
    `
    );
}