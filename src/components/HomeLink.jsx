import * as React from "react"

import {string} from "prop-types";
import {Link} from "@reach/router";
import slugify from "slugify";
import {useState} from "react";
import {isMobile} from "../services/auth";

const homeLinkClassname = "homeLink "

const HomeLink = ({className, children, slug}) => {
    className = className ?? ""
    className = homeLinkClassname + className
    const [isHovered, setHover] = useState(false)

    // TODO: Refactor out to share behavior with Logo
    const isOnPage = isBrowser ? window.location.pathname.replace("/", "") === children : false
    const finalClassName = isHovered || (isMobile() && isOnPage) ? className + " hovered" : className
    slug = slug ?? "/" + slugify(children, {lower: true}) + "/"
    return (
        <Link
            className={finalClassName}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            to={slug}>
            {children}
        </Link>
    )
}

HomeLink.propTypes = {
    children: string.isRequired,
    slug: string,
}

export default HomeLink