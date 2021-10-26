export const isBrowser = () => typeof window !== "undefined"


export const getAdmin = () =>
    isBrowser() && window.localStorage.getItem("isAdmin")
    ? JSON.parse(window.localStorage.getItem("isAdmin"))
    : {}

const setUser = isAdmin =>
    window.localStorage.setItem("isAdmin", JSON.stringify(isAdmin))

export const handleLogin = ({ username, password }) => {
    if (password === `pass`, ) {
        return setUser({
            username: `john`,
            name: `Johnny`,
            email: `johnny@example.org`,
        })
    }

    return false
}

export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
}

export const logout = callback => {
    setUser({})
    callback()
}