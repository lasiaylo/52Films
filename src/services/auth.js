export const isBrowser = () => typeof window !== "undefined"

export function isMobile() {
    if (isBrowser()) {
        return window.innerWidth <= 600 || window.innerHeight <=375
    }
    return false
}