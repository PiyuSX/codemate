
const API_URL = "http://localhost:3000/api"

const api = async (url, options = {}) => {
     const res = await fetch(`${API_URL}${url}`, {...options,
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