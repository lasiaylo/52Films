import React from 'react'
import "../../styles/about.sass"

const smallRowSize = 5;


export default function ProfilesContainer({profilePictures}) {
    let rowSize = smallRowSize;
    let prevRowSize = rowSize;
    const profiles = [];
    for (let i = 0; i < profilePictures.length; i += prevRowSize) {
        prevRowSize = rowSize;
        profiles.push(
            <div className={"pictureRow"} key={i}>
                {profilePictures.slice(i, i + rowSize)}
            </div>
        );
        rowSize === smallRowSize ? rowSize++ : rowSize--;
    }
    return <div className={"picturesContainer"}>
        {profiles}
    </div>;

}