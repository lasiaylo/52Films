import React, {useCallback, useState} from 'react'
import "../../styles/about.sass"
import {GatsbyImage} from "gatsby-plugin-image";

const getFilmmakers = (films) => {
    return Array.from(new Set(films.map(film => film.filmmaker[0])))
}

const getFilmmakerName = (filmmaker) => `${filmmaker.firstName} ${filmmaker.lastName}`

const getPronouns = (filmmaker) => `(${filmmaker.pronouns.join('/')})`

const getProfilePictures = (filmmakers, setFilmmaker) => {
    const pictures = new Array(16).fill(null)
    for (let i = 0; i < pictures.length; i++) {
        pictures[i] = getProfilePicture(filmmakers[i], setFilmmaker)
    }
    return pictures
}

const getProfilePicture = (filmmaker, setFilmmaker) => {
    let picture = <div className={"filmmakerFillerProfilePicture"}><span>?</span></div>
    if (filmmaker && filmmaker.profilePicture) {
        picture = <GatsbyImage
            className={"filmmakerProfilePicture"}
            alt={"Profile Picture"}
            image={filmmaker.profilePicture.gatsbyImageData}
            onClick={() => setFilmmaker(filmmaker)}
        />
    }
    return <div className={"filmmakerProfilePictureContainer"}>{picture}</div>
}


export default function About({films}) {
    const filmmakers = getFilmmakers(films)

    const [selectedFilmmaker, setSelectedFilmmaker] = useState(filmmakers[0])
    const setSelectedFilmmakerCallback = useCallback((filmmaker) => setSelectedFilmmaker(filmmaker))

    const name = getFilmmakerName(selectedFilmmaker)
    const pronouns = getPronouns(selectedFilmmaker)
    const bio = JSON.parse(selectedFilmmaker.bio.raw).content[0].content[0].value
    const profilePictures = getProfilePictures(filmmakers, setSelectedFilmmakerCallback)

    return (<div className={"aboutContainer"}>
            <div className={"aboutDescription"}>We are making 52 movies in one year.</div>
            <div className={"profilesContainer"}>
                <div className={"picturesContainer"}>
                    {profilePictures}
                </div>
                <div className={"profileDescriptionContainer"}>
                    <h2 className={"profileHeader"}>
                        <span className={"filmmakerName"}>{name}</span>
                        <span className={"filmmakerPronoun"}> {pronouns}</span>
                    </h2>
                    <h3 className={"filmmakerDescription"}>{bio}</h3>
                    <a className={"filmmakerLink"}
                       href={selectedFilmmaker.links.url}
                    >{selectedFilmmaker.links.displayText}</a>
                </div>
            </div>
        </div>
    )
}