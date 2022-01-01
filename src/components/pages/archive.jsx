import React, {useCallback, useEffect, useState} from 'react'
import Dump from "../archive/dump"
import Directory from "../archive/directory"
import "../../styles/archive.sass"
import {navigate} from '@reach/router'
import Credits from "../archive/credits";

const scrollTo = (index) => {
    const element = document.getElementById(`film${index}`)
    if (element) {
        element.scrollIntoView({block: "center", behavior: "smooth"})
    }
}

const fillerText = "?????"

export default function Archive(props) {
    const {setShowFilm} = props
    // let films = Array.from({
    //     length: 17
    // }, () => props.films).flat();
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
    films.splice(0, props.films.length, ...props.films)
    const [filmList, ] = useState(
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
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
            const hash = window.location.hash
            if (hash) {
                const index = parseInt(hash.split("#")[1])
                if (index && index < films.length) {
                    setSelectedIndex(index - 1)
                    scrollTo(index - 1)
                }
            }
        },
        [films.length]
    )

    const setSelected = useCallback((film, shouldScroll) => {
        if (typeof film !== 'undefined' && !film.filler) {
            const {index} = film
            setSelectedIndex(index)
            navigate(`/archive#${index + 1}`)

            if (shouldScroll && document) {
                scrollTo(index)
            }
        } else {
            setSelectedIndex(-1)
            navigate(`/archive`)
        }
    }, [])

    return (
        <div className={"archive"}>
            <Directory films={filmList} selectedIndex={selectedIndex} setSelected={setSelected} setShowFilm={setShowFilm}/>
            <Dump films={filmList} selectedIndex={selectedIndex} setSelected={setSelected} setShowFilm={setShowFilm}/>
            {selectedIndex !== -1  &&  <Credits film={films[selectedIndex]} setSelected={setSelected}/>}
        </div>
    )
}
