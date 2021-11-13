import * as React from "react"
import {graphql} from "gatsby"
import {GatsbyImage} from "gatsby-plugin-image";
import Hls from 'hls.js';
import VideoPlayer from "../components/player";


export const query = graphql`
    query HomePageQuery{
        allContentfulFilm(sort: { fields: [createdAt], order: ASC}) {
            edges {
                node {
                    title
                    description{
                        description
                    }
                    createdAt
                    filmmaker {
                        firstName
                        lastName
                    }
                    video
                    {
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
    }
`

// markup
const IndexPage = ({ data }) => {
    const film = data.allContentfulFilm.edges[0].node
    const {title} = film
    const {description} = film.description
    const {url} = film.preview.file
    console.log(url)


    return (
        <main >
            <title>Home Page</title>
            <h1>{title}</h1>
            <main>{description}</main>
            <VideoPlayer></VideoPlayer>
        </main>
    )
}

export default IndexPage
