import React from 'react'
import Carousel from "react-multi-carousel"
import {warnOnIncompatiblePeerDependency} from "gatsby/dist/bootstrap/load-plugins/validate";

export default function Selector({list}) {
    // render prev and call
    // render next
    // render current
    const responsive = {
        mobile: {
            breakpoint: { max: 3000, min: 0 },
            items: 3,
            partialVisibilityGutter: 40
        },
    }
    return (
        <Carousel
            containerClass={"carouselContainer"}
            responsive={responsive}
            centerMode
        >
            {list}
        </Carousel>
    )
}