import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

export const getFilmmakerName = (filmmaker) => {
    console.log(filmmaker.lastName)
    if (filmmaker.lastName === null) {
        return `${filmmaker.firstName}`
    }
    return `${filmmaker.firstName} ${filmmaker.lastName}`
}

const getPronouns = (filmmaker) => `(${filmmaker.pronouns.join('/')})`

export function FilmmakerBio({filmmaker}) {
    const [hidden, setHidden] = useState(false)
    const [filmmakerInfo, setFilmmakerInfo] = useState({})

    useEffect(() => {
            setHidden(true)
            if (filmmaker) {
                setTimeout(() => {
                    setFilmmakerInfo(({
                        name: getFilmmakerName(filmmaker),
                        pronouns: getPronouns(filmmaker),
                        bio: JSON.parse(filmmaker.bio.raw).content[0].content[0].value,
                        link: (filmmaker.links === null) ? null : <div>
                            <span className={"filmmakerLinksText"}>Links | </span>
                            <a className={"filmmakerLink"}
                               href={filmmaker.links.url}
                            >{filmmaker.links.displayText}</a>
                        </div>
                    }))
                    setHidden(false)
                }, 100)
            }
        }, [filmmaker]
    )

    const {name, pronouns, bio, link} = filmmakerInfo
    return (
        <motion.div className={"profileDescriptionContainer"}
                    key={"profileDescriptionContainer"}
                    initial={{opacity: 1}}
                    animate={{opacity: hidden ? 0 : 1}}
        >
            <h2 className={"profileHeader"}>
                <span className={"filmmakerName"}>{name}</span>
                <span className={"filmmakerPronoun"}> {pronouns}</span>
            </h2>
            <div className={"filmmakerDescriptionContainer"}>
                <h3 className={"filmmakerDescription"}>{bio}</h3>
                {link}
            </div>
        </motion.div>)
}
