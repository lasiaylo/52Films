import React, {useContext, useEffect, useState} from 'react'
import {CarouselContext} from 'pure-react-carousel'
import "../../styles/about.sass"
import {motion} from "framer-motion";
import {isMobile} from "../../services/auth";
import {MemoizedProfilePicture} from "../about/ProfilePicture";
import FilmmakerCarousel from "../about/FilmmakerCarousel";
import {FilmmakerBio} from "../about/FilmmakerBio";

const getFilmmakers = (films) => {
    return Array.from(new Set(films.map(film => film.filmmaker[0])))
}

const getProfilePictures = (filmmakers, selectedFilmmaker, setFilmmaker) => {
    const pictures = new Array(16).fill(null)
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
    const filmmakers = getFilmmakers(films)

    const [selectedFilmmaker, setSelectedFilmmaker] = useState(filmmakers[filmmakers.length - 1])
    const [hidden, setHidden] = useState(false)

    const setSelectedFilmmakerCallback = (filmmaker) => {
        if (filmmaker === selectedFilmmaker) {
            return
        }
        setHidden(true)
        setTimeout(() => {
            setHidden(false)
            setSelectedFilmmaker(filmmaker)
        }, 100)
    }

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