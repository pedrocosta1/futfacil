import axios from 'axios'

const API = process.env.VUE_APP_API

const firstRegister = async (
    id,
    name,
    phone,
    role
) => {
const { data } = await axios.post(`${API}/auth/register`, {
    id,
    name,
    phone,
    role
})
return data
}

export {
    firstRegister
}