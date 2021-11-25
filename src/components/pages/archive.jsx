import React from 'react';
import Preview from "../preview";
import Dump from "../tiles/dump";

export default function Archive({film}) {
    const {title, logline, preview} = film
    console.log('archive component')
    console.log(film)
    return (
            <Dump film={film}/>
    )
}