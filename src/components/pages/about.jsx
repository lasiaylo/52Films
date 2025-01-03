import React, { useMemo, useState } from "react";
import { isMobile } from "../../services/auth";
import { MemoizedProfilePicture } from "../about/ProfilePicture";
import FilmmakerCarousel from "../about/FilmmakerCarousel";
import { FilmmakerBio, getFilmmakerName } from "../about/FilmmakerBio";
import "../../styles/about.sass";
import { graphql, useStaticQuery } from "gatsby";
import ProfilesContainer from "../about/ProfilesContainer";

export const memberQuery = graphql`
  query {
    al: allContentfulPerson(filter: { firstName: { eq: "Allamaprabhu" } }) {
      edges {
        node {
          ...personQuery
        }
      }
    }
    robert: allContentfulPerson(filter: { firstName: { eq: "Robert" } }) {
      edges {
        node {
          ...personQuery
        }
      }
    }
    lasia: allContentfulPerson(filter: { firstName: { eq: "Lasia" } }) {
      edges {
        node {
          ...personQuery
        }
      }
    }
  }
`;

const getFilmmakers = (films) => {
  const map = new Map();
  // Need to use a map because sets allow for 'duplicate' objects
  // TODO: Find a better solution
  films.map((film) =>
    film.filmmaker.map((filmmaker) =>
      map.set(getFilmmakerName(filmmaker), filmmaker)
    )
  );
  return Array.from(map.values()).filter(
    (filmmaker) => getFilmmakerName(filmmaker) !== "ANONYMOUS"
  );
};

const getProfilePictures = (filmmakers, selectedFilmmaker, setFilmmaker) => {
  const pictures = new Array(filmmakers.length).fill(null);
  for (let i = 0; i < pictures.length; i++) {
    const filmmaker = filmmakers[i];
    pictures[i] = (
      <MemoizedProfilePicture
        key={i}
        filmmaker={filmmaker}
        isSelected={selectedFilmmaker === filmmaker}
        setFilmmaker={setFilmmaker}
      />
    );
  }
  return pictures;
};

export default function About({ films }) {
  const data = useStaticQuery(memberQuery);
  const filmmakers = useMemo(() => {
    const tempFilmmakers = getFilmmakers(films);
    const members = [
      data.al.edges[0].node,
      data.robert.edges[0].node,
      data.lasia.edges[0].node,
    ];
    const finalList = members.concat(tempFilmmakers);
    const map = new Map();
    //TODO: Redundant reduping. Consolidate.
    finalList.map((filmmaker) =>
      map.set(getFilmmakerName(filmmaker), filmmaker)
    );
    return Array.from(map.values());
  }, [films]);

  const [selectedFilmmaker, setSelectedFilmmaker] = useState(
    filmmakers[filmmakers.length - 1]
  );
  const setSelectedFilmmakerCallback = (filmmaker) =>
    setSelectedFilmmaker(filmmaker);
  const profilePictures = getProfilePictures(
    filmmakers,
    selectedFilmmaker,
    setSelectedFilmmakerCallback
  );
  return (
    <div className={"aboutContainer"}>
      <div className={"aboutDescription"}>
        We are making 52 movies in one year.
      </div>
      <div className={"profilesContainer"}>
        {!isMobile() && (
          <>
            <ProfilesContainer profilePictures={profilePictures} />
            <FilmmakerBio filmmaker={selectedFilmmaker} />
          </>
        )}
        {isMobile() && (
          <div>
            <FilmmakerCarousel
              onFocus={setSelectedFilmmakerCallback}
              filmmakers={filmmakers}
              startingSlide={filmmakers.length - 1}
            />
          </div>
        )}
      </div>
    </div>
  );
}
