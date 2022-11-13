import React from "react"
import {graphql} from "gatsby"
import {Link, Router} from '@reach/router'
import HomeLink from "../components/HomeLink"
import Film from "../components/data/Film"
import Home from "../components/pages/home"
import "../styles/index.sass"
import {useCallback, useMemo, useState} from "react";
import PlayerOverlay from "../components/PlayerOverlay";
import {AnimatePresence, motion} from "framer-motion";
import Intro from "../components/pages/intro";
import {isBrowser, isMobile} from "../services/auth";
import Logo from '../components/Logo'

const About = React.lazy(() => import ('../components/pages/about'))
const Archive = React.lazy(() => import ('../components/pages/archive'))

const LazyComponent = ({Component, ...props}) => (
    <React.Suspense fallback={'<p>Loading...</p>'}>
        <motion.div className={"router"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
        >
            <Component {...props} />
        </motion.div>
    </React.Suspense>
)

export const query = graphql`
    query PageQuery{
        allContentfulFilm(sort: { fields: [createdAt], order: ASC}) {
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
            }
        }
    }
`

function getMenuText(text) {
    return isMobile() ? text : `> ${text}`
}

export default function IndexPage({data}) {
    const films = useMemo(() => {
        const filmTitles = new Set();
        const filmDict = {};
        const undupedFilms = data.allContentfulFilm.edges.map(
            film => {
                const f = new Film(film.node)
                if (filmDict[f.title] === undefined) {
                    filmDict[f.title] = f;
                    return f;
                }
            }
        )
        // Contentful can send stale data w/ duplicate entries.
        // This shouldn't happen, thus a hacky fix.

        // const filmNames = [...new Set(undupedFilms.map(film => film.title))]
        console.log(undupedFilms);
        console.log(filmDict);
        return undupedFilms;
    }
    , [data.allContentfulFilm.edges])

    let shouldShowIntro = true
    if (isBrowser()) {


        shouldShowIntro = window.location.pathname.length < 2
    }

    // TODO: Move these states to an enum
    const [showIntro, setShowIntro] = useState(shouldShowIntro)
    const [isFrameExpanded, setFrameExpanded] = useState(!shouldShowIntro)
    const [isLogoCentered, setLogoCentered] = useState(shouldShowIntro)

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

    const film = films[films.length - 1]

    const showVariant = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
    }

    let logoState = 'hidden'

    if (!showIntro) {
        logoState = 'center'
        if (!isLogoCentered) {
            logoState = 'navBar'
        }
    }

    const logoVariant = {
        hidden: {opacity: 0},
        center: {opacity: 1},
        navBar: isMobile() ? {opacity: 1, left: "65px", top: "calc(100% - 21px)"} :
            {opacity: 1, left: "100px", top: "100px"}
    }


    // BAD. TODO: Make util to change class names based off of state
    const expanded = showSite ? "expanded" : ""

    return (
        <AnimatePresence>
            <title>52 films</title>
            <motion.div
                key={"introTransition"}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Intro
                    isFrameExpanded={isFrameExpanded}
                    isShowing={showIntro}
                    isLogoCentered={isLogoCentered}
                    setLogoCentered={setLogoCentered}
                    setShowIntro={setShowIntroCallback}
                >
                    A NEW FILM EVERY SATURDAY.
                </Intro>
            </motion.div>
            <div className={"siteContainer"} key={"siteContainer"}>
                <div className={"headerContainer"}>
                    {
                        !showIntro && <motion.div
                            className={"logo"}
                            key="menu"
                            initial={isLogoCentered ? "hidden" : "navBar"}
                            animate={logoState}
                            variants={logoVariant}
                            transition={{type: "tween", duration: 0.35}}
                            onAnimationComplete={() => {
                                if (logoState === 'navBar') {
                                    setShowSite(true)
                                } else {
                                    setTimeout(() => {
                                        setFrameExpanded(true)
                                    }, 200)
                                }
                            }}
                        >
                            <Link to={"/"}><Logo showText={isLogoCentered || !isMobile()} centered={isLogoCentered}/></Link>
                        </motion.div>
                    }
                    {
                        isMobile() && <div
                            className={`navbarLine ${expanded}`}
                            key={"navbarLine"}
                        > </div>
                    }
                    <div className="menu">
                        {
                            isMobile() &&
                            <span
                                className={`menuLine ${expanded}`}
                                key="menuLine1"
                            />
                        }
                        <motion.div
                            className={"link"}
                            key={"archive"}
                            initial="hidden"
                            animate={showSite ? "visible" : "hidden"}
                            variants={showVariant}
                            transition={{delay: 0.125}}
                        >
                            <HomeLink slug={"/archive"}>{getMenuText('archive')}</HomeLink>
                        </motion.div>
                        {
                            isMobile() &&
                            <motion.span
                                className={`menuLine ${expanded}`}
                                key="menuLine2"
                                style={{animationDelay: "0.15s"}}
                            />
                        }
                        <motion.div
                            className={"link"}
                            key={"about"}
                            initial="hidden"
                            animate={showSite ? "visible" : "hidden"}
                            variants={showVariant}
                            transition={{delay: 0.25}}
                        >
                            <HomeLink slug={"/about"}>{getMenuText('about')}</HomeLink>
                        </motion.div>
                    </div>
                </div>
                <motion.div className={'routerContainer'}
                            key={"mainFrame"}
                            initial={{opacity: 0}}
                            animate={{opacity: showSite ? 1 : 0}}
                            transition={{delay: 0.375}}
                >
                    <Router className={'router'}>
                        <Home film={film} showCard={showSite} setShowFilm={setShowFilmCallback}
                              filmCount={films.length} path="/"/>
                        <LazyComponent Component={Archive} films={films} setShowFilm={setShowFilmCallback}
                                       path="archive"/>
                        <LazyComponent Component={About} films={films} path="about"/>
                    </Router>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}