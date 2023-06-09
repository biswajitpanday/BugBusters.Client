const tokenPrefix = 'BUGBUSTER_';
const storage = {
    getToken: () => {
        return JSON.parse(window.localStorage.getItem(`${tokenPrefix}token`) as string);
    },

    setToken: (token: string) => {
        window.localStorage.setItem(`${tokenPrefix}token`, JSON.stringify(token));
    },

    clearToken: () => {
        window.localStorage.removeItem(`${tokenPrefix}token`);
    }
}

export default storage;