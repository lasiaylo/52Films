import * as React from "react"

import {string} from "prop-types";
import {Link} from "@reach/router";
import slugify from "slugify";

const homeLinkClassname = "homeLink "

const HomeLink = ({className, children, slug}) => {
    className = className ?? "";
    slug = slug ?? "/" + slugify(children) + "/"
    return <Link className={homeLinkClassname + className} to={slug}>{children}</Link>

}

HomeLink.propTypes = {
    children: string.isRequired,
    slug: string,
}

export default HomeLink