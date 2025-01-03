import * as React from "react";
import Film from "../data/Film";
import PropTypes from "prop-types";
import "../../styles/home.sass";
import CardCanvas from "../cardCanvas";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import useFitText from "use-fit-text";

function Home({ film, showCard, filmCount, setShowFilm }) {
  const { title, logline } = film;
  const { fontSize, ref } = useFitText();
  const count = useMemo(
    () => filmCount.toString().padStart(2, "0"),
    [filmCount]
  );
  return (
    <motion.div
      className={"home"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={"cardContainer"}>
        <CardCanvas film={film} showCard={showCard} setShowFilm={setShowFilm} />
      </div>
      <div className={"cardBorder"}>
        <span className={"cardCTA"}>CLICK TO WATCH</span>
        <span className={"cardNumber"}>{`${count} / 52`}</span>
      </div>
      <div className={"footer"}>
        <h2>{logline}</h2>
        <div className={"title"} ref={ref} style={{ fontSize }}>
          {title.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}

Home.propTypes = {
  film: PropTypes.instanceOf(Film).isRequired,
};

export default Home;
