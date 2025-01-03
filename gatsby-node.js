function getDate() {
    return `2025-01-01`
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === `/`) {
    page.matchPath = `/*`;
    createPage({
      ...page,
      context: { year: getDate() },
    });
  }
};
