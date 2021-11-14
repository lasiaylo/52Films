import * as React from "react"
import Film from "../Film";
import VideoPlayer from "../player";
import PropTypes from "prop-types";

function Home({film}) {
    // Replace with non-breaking hyphen
    return (
        <div>
            <VideoPlayer/>
            <h1>{this.title.toUpperCase()}</h1>
            <h2>{film.logline}</h2>
        </div>
    )
}

Home.propTypes = ({
    film: PropTypes.instanceOf(Film).isRequired
})


export default Home