import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  CarouselContext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { FillerProfilePicture } from "./ProfilePicture";
import { FilmmakerBio } from "./FilmmakerBio";

const getProfilePictures = (filmmakers) => {
  const pictures = new Array(filmmakers.length).fill(null);
  for (let i = 0; i < pictures.length; i++) {
    const filmmaker = filmmakers[i];
    //REFACTOR OUT OF ProfilePicture.jsx
    let picture = null;
    if (filmmaker && filmmaker.profilePicture) {
      picture = (
        <GatsbyImage
          key={i}
          className={"filmmakerProfilePicture"}
          alt={"Profile Picture"}
          image={filmmaker.profilePicture.gatsbyImageData}
        />
      );
    }
    pictures[i] = (
      <Slide
        index={i}
        key={i}
        className={"slide"}
        classNameHidden={"hidden"}
        innerClassName={"innerSlide"}
      >
        {picture ?? <FillerProfilePicture />}
      </Slide>
    );
  }
  return pictures;
};

const FilmmakerBioContainer = ({ filmmakers }) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }

    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);
  return <FilmmakerBio filmmaker={filmmakers[currentSlide]} />;
};

export default function FilmmakerCarousel({ filmmakers, startingSlide }) {
  console.log(startingSlide, filmmakers[startingSlide]);
  console.log(filmmakers.length);
  const pictures = useMemo(() => getProfilePictures(filmmakers), filmmakers);
  console.log(pictures.length);
  return (
    <CarouselProvider
      className={"carousel"}
      naturalSlideHeight={100}
      naturalSlideWidth={125}
      totalSlides={filmmakers.length}
      currentSlide={startingSlide ?? 0}
    >
      <Slider className={"slider"}>{pictures}</Slider>
      <FilmmakerBioContainer filmmakers={filmmakers} />
    </CarouselProvider>
  );
}
