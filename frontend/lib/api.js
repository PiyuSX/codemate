const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

const api = async (url, options = {}) => {
    const res = await fetch(`${API_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message)
    }

    return data
}

export default api