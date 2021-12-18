import * as React from "react"
import {graphql} from "gatsby"
import {Router} from '@reach/router'
import HomeLink from "../components/HomeLink"
import Film from "../components/data/Film"
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
    query PageQuery{
        allContentfulFilm(sort: { fields: [createdAt], order: DESC}) {
            edges {
                node {
                    title
                    description{
                        description
                    }
                    createdAt
                    videoSrc
                    filmmaker {
                        firstName
                        lastName
                    }
                    animPreview {
                        file {
                            url
                        }
                    }
                    stillPreview {
                        gatsbyImageData
                    }
                    credits
                }
            }
        }
    }
`

export default function IndexPage({data}) {
    const film = data.allContentfulFilm.edges[0].node
    const a = new Film(film)

    return (
        <div className={'frame'}>
            <div className={'innerFrame'}>
                <title>52 Films</title>
                <div className="menu">
                    <HomeLink className="title" slug="/">52 Films</HomeLink>
                    <HomeLink>Archive</HomeLink>
                    <HomeLink>About</HomeLink>
                </div>
                <div className={'routerContainer'}>
                    <Router className={'router'}>
                        <Home film={a} path="/"/>
                        <LazyComponent Component={Archive} film={a} path="archive"/>
                        <LazyComponent Component={About} path="about"/>
                    </Router>
                </div>
            </div>
        </div>
    )
}