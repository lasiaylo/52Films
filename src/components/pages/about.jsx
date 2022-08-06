import React, {useMemo, useState} from 'react'
import {isMobile} from "../../services/auth";
import {MemoizedProfilePicture} from "../about/ProfilePicture"
import FilmmakerCarousel from "../about/FilmmakerCarousel"
import {FilmmakerBio, getFilmmakerName} from "../about/FilmmakerBio"
import "../../styles/about.sass"

export const filmmakerNumber = 20

const getFilmmakers = (films) => {
    const map = new Map();

    // Need to use a map because sets allow for 'duplicate' objects
    // TODO: Find a better solution
    films.map(film => film.filmmaker.map( filmmaker=>
        map.set(
        getFilmmakerName(filmmaker),
        filmmaker,)
    ));
    return Array.from(map.values()).filter(filmmaker => getFilmmakerName(filmmaker) !== 'ANONYMOUS')
}

const getProfilePictures = (filmmakers, selectedFilmmaker, setFilmmaker) => {
    const pictures = new Array(filmmakerNumber).fill(null)
    for (let i = 0; i < pictures.length; i++) {
        const filmmaker = filmmakers[i]
        pictures[i] =
            <MemoizedProfilePicture
                key={i}
                filmmaker={filmmaker}
                isSelected={selectedFilmmaker === filmmaker}
                setFilmmaker={setFilmmaker}
            />
    }
    return pictures
}

export default function About({films}) {
    const filmmakers = useMemo(()=> getFilmmakers(films), [films])
    const [selectedFilmmaker, setSelectedFilmmaker] = useState(filmmakers[filmmakers.length - 1])
    const setSelectedFilmmakerCallback = (filmmaker) => setSelectedFilmmaker(filmmaker)
    const profilePictures = getProfilePictures(filmmakers, selectedFilmmaker, setSelectedFilmmakerCallback)
    return (
        <div className={"aboutContainer"}>
            <div className={"aboutDescription"}>We are making 52 movies in one year.</div>
            <div className={"profilesContainer"}>
                {
                    !isMobile() &&
                    <div className={"picturesContainer"}>
                        {profilePictures}
                    </div>
                }
                {
                    !isMobile() &&
                    <FilmmakerBio filmmaker={selectedFilmmaker}/>
                }
                {isMobile() &&
                <FilmmakerCarousel
                    onFocus={setSelectedFilmmakerCallback}
                    filmmakers={filmmakers}
                    startingSlide={filmmakers.length - 1}
                />}
            </div>
        </div>
    )
}
