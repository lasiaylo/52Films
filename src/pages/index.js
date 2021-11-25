import * as React from "react"
import {graphql} from "gatsby"
import {Router} from '@reach/router'
import HomeLink from "../components/HomeLink"
import Film from "../components/Film"
import Home from "../components/pages/home"
import "../styles/index.sass"

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
    const film = data.allContentfulFilm.edges[2].node
    const a = new Film(film)

    return (
        <div className={'frame'}>
            <div className={'innerFrame'}>
                <title>Home Page</title>
                <div className="menu">
                    <HomeLink className="title" slug="/">52 Films</HomeLink>
                    <HomeLink>Archive</HomeLink>
                    <HomeLink>About</HomeLink>
                </div>
                <div className={'router'}>
                    <Router>
                        <Home film={a} path="/"/>
                        <LazyComponent Component={Archive} film={a} path="archive"/>
                        <LazyComponent Component={About} path="about"/>
                    </Router>
                </div>
                {/*<LazyComponent Component={Archive} film={film} path="archive"/>*/}
            </div>
        </div>
    )
}