class Film {
    static muxURL = "https://stream.mux.com/"
    static muxSuffix = ".m3u8"

    constructor(film) {
        ({
            title: this.title,
            description: {description: this.logline},
            createdAt: this.createdAt,
            filmmaker: this.filmmaker,
            preview: {file: this.preview},
            video: {playbackId: this.playbackID},
        } = film)
        this.videoRef = Film.muxURL + film.video.playbackId + Film.muxSuffix
    }
}

export default Film