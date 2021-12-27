import * as React from "react"
import {graphql} from "gatsby"
import {Router} from '@reach/router'
import HomeLink from "../components/HomeLink"
import Film from "../components/data/Film"
import Home from "../components/pages/home"
import "../styles/index.sass"
import {useCallback, useEffect, useMemo, useState} from "react";
import PlayerOverlay from "../components/PlayerOverlay";
import {AnimatePresence, motion} from "framer-motion";
import Intro from "../components/pages/intro";
import {isBrowser} from "../services/auth";

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
    const films = useMemo(() => data.allContentfulFilm.edges.map(
        film => {
            return new Film(film.node)
        }
    ), [data.allContentfulFilm.edges])

    let shouldShowIntro = true
    if (isBrowser()) {
        shouldShowIntro = window.location.pathname.length < 2
    }

    const [showIntro, setShowIntro] = useState(shouldShowIntro)
    const [showSite, setShowSite] = useState(!shouldShowIntro)

    const [showFilm, setShowFilm] = useState()
    const setShowIntroCallback = useCallback((shouldShow) => setShowIntro(shouldShow), [])
    const setShowFilmCallback = useCallback((film) => {
        if (film && !film.filler) {
            setShowFilm(film)
        } else {
            setShowFilm()
        }
    }, [])

    if (showFilm) {
        return (
            <AnimatePresence>
                <motion.div
                    className={"playerOverlayContainer"}
                    key={"playerOverlay"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <PlayerOverlay src={showFilm.videoSrc} setShowFilm={setShowFilmCallback}/>
                </motion.div>
            </AnimatePresence>
        )
    }

    const film = films[0]

    const showVariant = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
    }
    return (
        <AnimatePresence>
            <title>52 films</title>
            <motion.div
                key={"introTransition"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Intro isShowing={showIntro} setShowIntro={setShowIntroCallback}>A NEW FILM EVERY SATURDAY.</Intro>
            </motion.div>
            <div className={"siteContainer"} key={"siteContainer"}>
                <div className="menu">
                    <motion.div
                        key="menu"
                        initial="hidden"
                        animate={showIntro ? "hidden" : "visible"}
                        variants={showVariant}
                        transition={{type: "tween", duration: 0.375}}
                        onAnimationComplete={() => {
                            setTimeout(
                                () => setShowSite(!showIntro), 150
                            )
                        }}
                    >
                        <HomeLink className="title" slug="/">52 films</HomeLink>
                    </motion.div>
                    <motion.div
                        className={"homeLink"}
                        key={"archive"}
                        initial="hidden"
                        animate={showSite ? "visible" : "hidden"}
                        variants={showVariant}
                        transition={{delay: 0.125}}
                    >
                        <HomeLink slug={"/archive"}>> archive</HomeLink>
                    </motion.div>
                    <motion.div
                        className={"homeLink"}
                        key={"about"}
                        initial="hidden"
                        animate={showSite ? "visible" : "hidden"}
                        variants={showVariant}
                        transition={{delay: 0.25}}
                    >
                        <HomeLink slug={"/about"}>> about</HomeLink>
                    </motion.div>
                </div>
                <motion.div className={'routerContainer'}
                            key={"mainFrame"}
                            initial={{opacity: 0}}
                            animate={{opacity: showSite ? 1 : 0}}
                            transition={{delay: 0.375}}
                >
                    <Router className={'router'}>
                        <Home film={film} showCard={showSite} setShowFilm={setShowFilmCallback} filmCount={films.length} path="/"/>
                        <LazyComponent Component={Archive} films={films} setShowFilm={setShowFilmCallback}
                                       path="archive"/>
                        <LazyComponent Component={About} path="about"/>
                    </Router>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}