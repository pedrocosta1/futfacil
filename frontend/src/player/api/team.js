import axios from 'axios'

const API = process.env.VUE_APP_API

const config = {
  headers: {
    'Accept': '',
    'Content-Type': 'multipart/form-data'
  }
}

const getAll = async (id) => {
  const { data } = await axios.get(`${API}/team`)
  return data
}

const get = async (id) => {
  const { data } = await axios.get(`${API}/team/${id}`)
  return data
}

const getTeamChallenge = async (player) => {
  const { data } = await axios.get(`${API}/team/challenge/${player}`)
  return data
}

const create = async (
  name,
  player,
  logo,
) => {
  if(logo) {
    const fd = new FormData()
      fd.append('name', name)
      fd.append('player', player)
      fd.append('logo', logo)
    return axios.post(`${API}/team`, fd, config)  
  }
  else {
    return axios.post(`${API}/team`, {
      name,
      player,
      logo,
    })
  }
}

const update = async (
  id,
  name,
  player,
  logo,
) => {
  if(logo) {
    const fd = new FormData()
      fd.append('name', name)
      fd.append('player', player)
      fd.append('logo', logo)
    return axios.put(`${API}/team/${id}`, fd, config)  
  } else {
    return axios.put(`${API}/team/${id}`, {
      name,
      player,
      logo,
    })
  }
}

const remove = async (
  id,
  active
) => {
  return axios.put(`${API}/team/delete/${id}`, {
    active
  })
}

export {
  getAll,
  get,
  getTeamChallenge,
  create,
  update,
  remove
}
