import axios from 'axios'

const API = process.env.VUE_APP_API

const firstRegister = async (
    id,
    name,
    phone
) => {
    const { data } = await axios.post(`${API}/auth/register`, {
        id,
        name,
        phone
    })
    return data
}

export {
    firstRegister
}