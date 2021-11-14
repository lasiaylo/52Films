import * as React from "react"
import {graphql} from "gatsby"
import VideoPlayer from "../components/player";
import {Router, Link} from '@reach/router';
import HomeLink from "../components/HomeLink";

const About = React.lazy(() => import ('../components/pages/about'))
const Archive = React.lazy(() => import ('../components/pages/archive'))

const LazyComponent = ({Component, ...props}) => (
    <React.Suspense fallback={'<p>Loading...</p>'}>
        <Component {...props} />
    </React.Suspense>
)

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

const Home = () => <h1>This is the home page</h1>

const IndexPage = ({data}) => {
    const film = data.allContentfulFilm.edges[0].node
    const {title} = film
    const {description} = film.description
    const {url} = film.preview.file

    return (
        <main>
            <title>Home Page</title>
            <h1>{title}</h1>
            <main>{description}</main>
            <VideoPlayer></VideoPlayer>
            <Router>
                <Home path="/"/>
                <LazyComponent Component={Archive} path="archive"/>
                <LazyComponent Component={About} path="about"/>
            </Router>
            <div>
                <HomeLink slug="/">53 Films</HomeLink>
                <br/>
                <Link to="/archive/">Archive</Link>
                <br/>
                <Link to="/about">About Us</Link>
                <br/>
            </div>
        </main>
    )
}

export default IndexPage
