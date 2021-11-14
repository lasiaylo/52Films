import * as React from "react"
import {graphql} from "gatsby"
import {Router, Link} from '@reach/router';
import HomeLink from "../components/HomeLink";
import Film from "../components/Film";
import Home from "../components/pages/home";

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

export default function IndexPage({data}) {
    const film = data.allContentfulFilm.edges[0].node
    const a = new Film(film)
    console.log(a)

    return (
        <main>
            <title>Home Page</title>
            <div>
                <HomeLink slug="/">53 Films</HomeLink>
                <br/>
                <Link to="/archive/">Archive</Link>
                <br/>
                <Link to="/about">About Us</Link>
                <br/>
            </div>
            <Router>
                <Home film={a} path="/"/>
                <LazyComponent Component={Archive} path="archive"/>
                <LazyComponent Component={About} path="about"/>
            </Router>
        </main>
    )
}