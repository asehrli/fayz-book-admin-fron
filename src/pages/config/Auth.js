export const getToken = () => {
    const acc = localStorage.getItem('access-token')
    const ref = localStorage.getItem('refresh-token')

    if (acc === null || ref === null)
        return null;

    return {
        access: acc,
        refresh: ref,
    }
}

export const auth = () => {
    return {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access-token")
        }
    }
}

export const BASE_URL = "http://localhost:8080"