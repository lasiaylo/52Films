import React from 'react';
import Preview from "../preview";

export default function Archive({film}) {
    const {title, logline, preview} = film
    console.log('archive component')
    console.log(film)
    return (
        <div className={'footer'}>
            <Preview image={preview}/>
            <h1>{title.toUpperCase()}</h1>
            <h2>{logline.toUpperCase()}</h2>
        </div>
        // <Preview image={preview}/>
    )
}