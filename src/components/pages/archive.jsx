import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Dump from "../archive/dump"
import Directory from "../archive/directory"
import "../../styles/archive.sass"
import {navigate} from '@reach/router'
import Credits from "../archive/credits";
import {isMobile} from "../../services/auth";
import {graphql, useStaticQuery} from "gatsby";
import {memberQuery} from "./about";
import Film from "../data/Film";

export const lastyearQuery = graphql`
    query {
        films: allContentfulFilm(
            filter: {createdAt:{lt: "2023-01-01"}},
            sort: { fields: [createdAt],
                order: ASC}
        ) {
            edges {
                ...FilmQuery
            }
        },
    }
`

const scrollTo = (index) => {
    const element = document.getElementById(`film${index}`)
    if (element) {
        element.scrollIntoView({block: "center", behavior: "smooth"})
    }
}

const fillerText = "?????"

export function getListWithFiller(filmsToAdd) {
    const films = new Array(52).fill({
        title: fillerText,
        filmmaker: [
            {
                firstName: fillerText,
                lastName: "",
            }
        ],
        filler: true
    })
    films.splice(0, filmsToAdd.length, ...filmsToAdd)
    return films.map(
        (film, i) => {
            let filmInfo = film ?? {}
            return {
                ...filmInfo,
                index: i,
                hidden: false,
            }
        }
    )
}

export default function Archive(props) {
    const data = useStaticQuery(lastyearQuery, props);
    const lastyearFilms = useMemo(() => getListWithFiller(data.films.edges.map(
        film => {
            return new Film(film.node)
        }
    )), [data.films.edges]);
    const thisYearFilms = useMemo(() => getListWithFiller(props.films), [props.films]);


    const [year, setYear] = useState(2023)
    const {setShowFilm} = props

    // TODO: Hacky solution. Fix
    // let filmsToAdd = year === 2022 ? lastyearFilms : props.films;
    // const films = filmsToAdd;
    const [filmList, setFilmListImpl] = useState(thisYearFilms)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
        let filmsToAdd = year === 2022 ? lastyearFilms : thisYearFilms;
        setFilm(filmsToAdd)
    }, [year])

    const setFilm = useCallback(films => {
        setFilmListImpl(
            films.map(
                (film, i) => {
                    let filmInfo = film ?? {}
                    return {
                        ...filmInfo,
                        index: i,
                        hidden: false,
                    }
                }
            )
        )
    })

    const setSelected = useCallback((film, shouldScroll) => {
        if (typeof film !== 'undefined' && !film.filler) {
            const {index} = film
            setSelectedIndex(index)
            // TODO: Reimplement navigating. Be sure to clean up history when you reimplement
            // navigate(`/archive#${index + 1}`)

            if (shouldScroll && document) {
                scrollTo(index)
            }
        } else {
            setSelectedIndex(-1)
            // navigate(`/archive`)
        }
    }, [])

    // TODO: Scroll to URL
    // useEffect(() => {
    //         const hash = window.location.hash
    //         if (hash) {
    //             const index = parseInt(hash.split("#")[1])
    //             if (index && index < films.length) {
    //                 setSelectedIndex(index - 1)
    //                 scrollTo(index - 1)
    //             }
    //         }
    //     },
    //     [films.length]
    // )

    return (
        <div className={"archive"}>
            <Directory films={filmList} selectedIndex={selectedIndex} setSelected={setSelected} setShowFilm={setShowFilm} year={year} setYear={setYear}/>
            {!isMobile() && <Dump films={filmList} selectedIndex={selectedIndex} setSelected={setSelected} setShowFilm={setShowFilm}/>}
            {!isMobile() && selectedIndex !== -1  &&  <Credits film={filmList[selectedIndex]} setSelected={setSelected}/>}
        </div>
    )
}
