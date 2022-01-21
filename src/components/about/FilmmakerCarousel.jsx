import React, {useMemo} from 'react'
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {GatsbyImage} from "gatsby-plugin-image";
import {FillerProfilePicture} from "./ProfilePicture";

const getProfilePictures = (filmmakers, onFocus) => {
    const pictures = new Array(16).fill(null)
    for (let i = 0; i < pictures.length; i++) {
        const filmmaker = filmmakers[i]
        //REFACTOR OUT OF ProfilePicture.jsx
        let picture = null
        if (filmmaker && filmmaker.profilePicture) {
            picture = <GatsbyImage
                key={i}
                className={"filmmakerProfilePicture"}
                alt={"Profile Picture"}
                image={filmmaker.profilePicture.gatsbyImageData}
            />
        }
        pictures[i] = <Slide
            index={i}
            key={i}
            onFocus={picture === null ? undefined : () => console.log("alkjdlkjslkjs")}
        >
            {picture ?? <FillerProfilePicture/>}
        </Slide>
    }
    return pictures
}


export default function FilmmakerCarousel({filmmakers, onFocus}) {
    const pictures = getProfilePictures(filmmakers)
    console.log(pictures)
    return (
        <CarouselProvider
            className={"carousel"}
            naturalSlideHeight={100}
            naturalSlideWidth={125}
            totalSlides={16}>
            <Slider
                className={"slider"}
            >
                {pictures}
                {/*<Slide index={0}>I am the first Slide.</Slide>*/}
                {/*<Slide index={1}>I am the second Slide.</Slide>*/}
            </Slider>
        </CarouselProvider>
    )
}