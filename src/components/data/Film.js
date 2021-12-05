class Film {
    static muxURL = "https://stream.mux.com/"
    static muxSuffix = ".m3u8"

    constructor(film) {
        ({
            createdAt: this.createdAt,
            filmmaker: this.filmmaker,
            video: {playbackId: this.playbackID},
        } = film)
        // Replace hyphen with non-breaking hyphen
        this.title = film.title.replace('-', '‑')
        this.logline = film.description.description.replace('-', '‑')
        this.animPreview = film.animPreview.file.url
        // Urls are suffixed by "//"
        this.animPreview = "https:" + this.animPreview
        this.stillPreview = film.stillPreview.gatsbyImageData
        this.videoSrc = Film.muxURL + film.video.playbackId + Film.muxSuffix
    }
}

export default Film