class Film {
    static muxURL = "https://stream.mux.com/"
    static muxSuffix = ".m3u8"

    constructor(film) {
        ({
            createdAt: this.createdAt,
            filmmaker: this.filmmaker,
            preview: {file: this.preview},
            video: {playbackId: this.playbackID},
        } = film)
        // Replace with hyphen with non-breaking hyphen
        this.title = film.title.replace('-', '‑')
        this.description = film.description.description.replace('-', '‑')
        this.videoRef = Film.muxURL + film.video.playbackId + Film.muxSuffix
    }
}

export default Film