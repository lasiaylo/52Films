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

    let shouldShowIntro = false
    if (isBrowser()) {
        shouldShowIntro = window.location.pathname.length < 2
    }

    const [showIntro, setShowIntro] = useState(shouldShowIntro ?? true)
    const [showSite, setShowSite] = useState(!shouldShowIntro ?? false)

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
    return (
        <AnimatePresence>
            <div className={'frame'}
                 key={"mainFrame"}
            >
                <title>52 films</title>
                {showIntro &&
                <Intro isShowing={showIntro} setShowIntro={setShowIntroCallback}>A NEW FILM EVERY SATURDAY. STARTING 2022.</Intro>}
                {!showIntro &&
                <motion.div
                    className={'innerFrame'}
                    layoutId={"frame"}
                    onLayoutAnimationComplete={() => {
                        setShowSite(true)
                    }}
                >
                    {/*{showSite && <motion.div className={"siteContainer"}*/}
                    {/*                         key={"mainFrame"}*/}
                    {/*                         initial={{opacity: 0}}*/}
                    {/*                         animate={{opacity: 1}}*/}
                    {/*                         exit={{opacity: 0}}>*/}
                    {/*    <div className="menu">*/}
                    {/*        <HomeLink className="title" slug="/">52 films</HomeLink>*/}
                    {/*        <HomeLink slug={"/archive"}>> archive</HomeLink>*/}
                    {/*        <HomeLink slug={"/about"}>> about</HomeLink>*/}
                    {/*    </div>*/}
                    {/*    <div className={'routerContainer'}>*/}
                    {/*        <Router className={'router'}>*/}
                    {/*            <Home film={film} setShowFilm={setShowFilmCallback} filmCount={films.length} path="/"/>*/}
                    {/*            <LazyComponent Component={Archive} films={films} setShowFilm={setShowFilmCallback}*/}
                    {/*                           path="archive"/>*/}
                    {/*            <LazyComponent Component={About} path="about"/>*/}
                    {/*        </Router>*/}
                    {/*    </div>*/}
                    {/*</motion.div>}*/}
                </motion.div>}
            </div>
        </AnimatePresence>
    )
}