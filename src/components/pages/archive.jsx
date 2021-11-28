import React from 'react';
import Preview from "../preview";
import Dump from "../tiles/dump";

export default function Archive({film}) {
    const {title, logline, preview} = film
    const films = new Array(52).fill(film)
    return (
            <Dump films={films}/>
    )
}