import React, {memo, useMemo, useState} from "react";
import {GatsbyImage} from "gatsby-plugin-image";

export const FillerProfilePicture = () => <div className={"filmmakerFillerProfilePicture"}><span>?</span></div>
const ProfilePicture = ({filmmaker, isSelected, setFilmmaker}) => {
    const [hover, setHover] = useState(false)
    const className = "actualFilmmakerProfilerPictureContainer"
    const hoverClassName = hover ? `${className} hover` : className
    const finalClassName = isSelected ? `${hoverClassName} selected` : hoverClassName
    const picture = useMemo(() => {
        if (filmmaker && filmmaker.profilePicture) {
            return <GatsbyImage
                className={"filmmakerProfilePicture"}
                alt={"Profile Picture"}
                image={filmmaker.profilePicture.gatsbyImageData}
            />
        }
        return null
    }, [filmmaker])

    let profilePicture = picture === null
        ? <FillerProfilePicture/> :
        <div className={finalClassName}
             onPointerOver={() => setHover(true)}
             onPointerLeave={() => setHover(false)}
             onClick={() => setFilmmaker(filmmaker, isSelected)}
        >
            {picture}
        </div>

    return <div className={"filmmakerProfilePictureContainer"}>{profilePicture}</div>
}

export const MemoizedProfilePicture =
     memo(
        ProfilePicture,
        (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
    )