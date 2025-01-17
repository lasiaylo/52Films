class Film {
  constructor(film) {
    try {
      ({
        createdAt: this.createdAt,
        publishDate: this.publishDate,
        filmmaker: this.filmmaker,
        videoSrc: this.videoSrc,
      } = film);
      // Replace hyphen with non-breaking hyphen
      this.id = film.id;
      this.title = film.title.replace("-", "‑");
      this.logline = film.description.description.replace("-", "‑");
      this.animPreview = film.animPreview.file.url;
      // Urls are suffixed by "//"
      this.animPreview = "https:" + this.animPreview;
      this.stillPreview = film.stillPreview.gatsbyImageData;
      this.credits = film.credits.credits.split(/\r?\n/);
    } catch {}
  }
}

export default Film;
