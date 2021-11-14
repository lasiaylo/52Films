import * as React from "react"

import {string} from "prop-types";
import {Link} from "@reach/router";
import slugify from "slugify";

const HomeLink = ({children, slug}) => {
    console.log(slug);
    slug = slug ?? "/" + slugify(children) + "/"
    return <Link to={slug}>{children}</Link>
}

HomeLink.propTypes = {
    children: string.isRequired,
    slug: string,
}

export default HomeLink