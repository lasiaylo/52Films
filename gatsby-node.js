function getDate() {
    const year = new Date().getFullYear();
    return `${year}-01-01`
}

exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions;
    if (page.path === `/`) {
        page.matchPath = `/*`;
        createPage({
            ...page,
            context: {year: getDate()}
        });
    }
};
