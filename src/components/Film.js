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
        this.preview = film.preview.file.url
        // Urls are suffixed by "//"
        this.preview = "https:" + this.preview
        this.videoRef = Film.muxURL + film.video.playbackId + Film.muxSuffix
    }
}

export default Film