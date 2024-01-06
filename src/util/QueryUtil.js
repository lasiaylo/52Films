import {graphql} from "gatsby"

export const filmQuery = graphql`
    fragment FilmQuery on ContentfulFilmEdge {
        node {
            id
            title
            description{
                description
            }
            createdAt
            publishDate
            videoSrc
            filmmaker {
                ...personQuery
            }
            animPreview {
                file {
                    url
                }
            }
            stillPreview {
                gatsbyImageData(aspectRatio: 1)
            }
            credits {
                credits
            }
        }
}`

export const personQuery = graphql`
    fragment personQuery on ContentfulPerson {
            firstName
            lastName
            pronouns
            bio {
                raw
            }
            links {
                displayText
                url
            }
            profilePicture {
                gatsbyImageData(width: 300, aspectRatio: 1)
            }
}`;
