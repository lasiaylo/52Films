import React, {useMemo, useState} from 'react'
import {isMobile} from "../../services/auth";
import {MemoizedProfilePicture} from "../about/ProfilePicture"
import FilmmakerCarousel from "../about/FilmmakerCarousel"
import {FilmmakerBio, getFilmmakerName} from "../about/FilmmakerBio"
import "../../styles/about.sass"
import {graphql, useStaticQuery} from "gatsby"
import ProfilesContainer from "../about/ProfilesContainer";

export const filmmakerNumber = 22

export const LasiaQuery = graphql`
    query HeaderQuery{
        allContentfulPerson(filter: {firstName: {eq: "Lasia"}}) {
           edges {
               node{
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
           } 
        }
    }
`

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
    const lasiaQuery = useStaticQuery(LasiaQuery);
    const filmmakers = useMemo(()=> {
        const tempFilmmakers = getFilmmakers(films);
        // Append Lasia to the end. TODO: make less hacky
        const lasiaProfile = lasiaQuery.allContentfulPerson.edges[0].node;
        tempFilmmakers.push(lasiaProfile);
        return tempFilmmakers;
    }, [films])
    console.log(filmmakers);


    const [selectedFilmmaker, setSelectedFilmmaker] = useState(filmmakers[filmmakers.length - 1])
    const setSelectedFilmmakerCallback = (filmmaker) => setSelectedFilmmaker(filmmaker)
    const profilePictures = getProfilePictures(filmmakers, selectedFilmmaker, setSelectedFilmmakerCallback)
    return (
        <div className={"aboutContainer"}>
            <div className={"aboutDescription"}>We are making 52 movies in one year.</div>
            <div className={"profilesContainer"}>
                {
                    !isMobile() &&
                        <ProfilesContainer profilePictures={profilePictures}/>
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
