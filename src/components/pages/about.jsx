import React, {memo, useCallback, useEffect, useMemo, useState} from 'react'
import "../../styles/about.sass"
import {GatsbyImage} from "gatsby-plugin-image";
import {AnimatePresence, motion} from "framer-motion";

const getFilmmakers = (films) => {
    return Array.from(new Set(films.map(film => film.filmmaker[0])))
}

const getFilmmakerName = (filmmaker) => `${filmmaker.firstName} ${filmmaker.lastName}`

const getPronouns = (filmmaker) => `(${filmmaker.pronouns.join('/')})`

const getProfilePictures = (filmmakers, selectedFilmmaker, setFilmmaker) => {
    const pictures = new Array(16).fill(null)
    for (let i = 0; i < pictures.length; i++) {
        const filmmaker = filmmakers[i]
        pictures[i] = <MemoizedProfilePicture filmmaker={filmmaker} isSelected={selectedFilmmaker === filmmaker}
                                              setFilmmaker={setFilmmaker}/>
    }
    return pictures
}

const ProfilePicture = ({filmmaker, isSelected, setFilmmaker}) => {
    const [hover, setHover] = useState(false)
    const className = "actualFilmmakerProfilerPictureContainer"
    const hoverClassName = hover ? `${className} hover` : className
    const finalClassName = isSelected ? `${hoverClassName} selected` : hoverClassName
    const picture = useMemo(() => {
        if (filmmaker && filmmaker.profilePicture) {
            return <GatsbyImage
                className={"filmmakerProfilePicture"}
                alt={"Profile Picture"}
                image={filmmaker.profilePicture.gatsbyImageData}
            />
        }
        return null
    }, [])

    let profilePicture = picture === null
        ? <div className={"filmmakerFillerProfilePicture"}><span>?</span></div> :
        <div className={finalClassName}
             onPointerOver={() => setHover(true)}
             onPointerLeave={() => setHover(false)}
             onClick={() => setFilmmaker(filmmaker, isSelected)}
        >
            {picture}
        </div>

    return <div className={"filmmakerProfilePictureContainer"}>{profilePicture}</div>
}

const MemoizedProfilePicture = memo(
    ProfilePicture,
    (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
)


export default function About({films}) {
    const filmmakers = getFilmmakers(films)

    const [selectedFilmmaker, setSelectedFilmmaker] = useState(filmmakers.at(-1))
    const [hidden, setHidden] = useState(false)

    const setSelectedFilmmakerCallback = useCallback((filmmaker) => {
        if (filmmaker === selectedFilmmaker) {
            return
        }
        setHidden(true)
        setTimeout(() => {
            setHidden(false)
            setSelectedFilmmaker(filmmaker)
        }, 100)
    })

    const profilePictures = getProfilePictures(filmmakers, selectedFilmmaker, setSelectedFilmmakerCallback)
    const name = getFilmmakerName(selectedFilmmaker)
    const pronouns = getPronouns(selectedFilmmaker)
    const bio = JSON.parse(selectedFilmmaker.bio.raw).content[0].content[0].value

    return (<div className={"aboutContainer"}>
            <div className={"aboutDescription"}>We are making 52 movies in one year.</div>
            <div className={"profilesContainer"}>
                <div className={"picturesContainer"}>
                    {profilePictures}
                </div>
                <motion.div className={"profileDescriptionContainer"}
                            key={"profileDescriptionContainer"}
                            initial={{opacity: 1}}
                            animate={{opacity: hidden ? 0 : 1}}
                >
                    <h2 className={"profileHeader"}>
                        <span className={"filmmakerName"}>{name}</span>
                        <span className={"filmmakerPronoun"}> {pronouns}</span>
                    </h2>
                    <h3 className={"filmmakerDescription"}>{bio}</h3>
                    <a className={"filmmakerLink"}
                       href={selectedFilmmaker.links.url}
                    >{selectedFilmmaker.links.displayText}</a>
                </motion.div>
            </div>
        </div>
    )
}