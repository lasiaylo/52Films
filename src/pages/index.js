import * as React from "react"
import {graphql} from "gatsby"
import {Router} from '@reach/router'
import HomeLink from "../components/HomeLink"
import Film from "../components/data/Film"
import Home from "../components/pages/home"
import "../styles/index.sass"
import {useState} from "react";
import PlayerOverlay from "../components/PlayerOverlay";
import {AnimatePresence, motion} from "framer-motion";

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
                    credits {
                        credits
                    }
                }
            }
        }
    }
`

export default function IndexPage({data}) {
    const film = data.allContentfulFilm.edges[0].node
    const a = new Film(film)

    const [showFilm, setShowFilm] = useState(false)
    if (showFilm) {
        return (
            <AnimatePresence>
                <motion.div className={"playerOverlayContainer"}
                            key={"playerOverlay"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}>
                    <PlayerOverlay src={film.videoSrc} setShowFilm={setShowFilm}/>
                </motion.div>
            </AnimatePresence>
        )
    }
    return (
        <AnimatePresence>
            <motion.div className={'frame'}
                        key={"mainFrame"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
            >
                <div className={'innerFrame'}>
                    <title>52 Films</title>
                    <div className="menu">
                        <HomeLink className="title" slug="/">52 Films</HomeLink>
                        <HomeLink>Archive</HomeLink>
                        <HomeLink>About</HomeLink>
                    </div>
                    <div className={'routerContainer'}>
                        <Router className={'router'}>
                            <Home film={a} setShowFilm={setShowFilm} path="/"/>
                            <LazyComponent Component={Archive} film={a} setShowFilm={setShowFilm} path="archive"/>
                            <LazyComponent Component={About} path="about"/>
                        </Router>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}