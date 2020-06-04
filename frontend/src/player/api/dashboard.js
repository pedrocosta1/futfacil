import axios from 'axios'

const API = process.env.VUE_APP_API

const getCaptain = async (player) => {
  const { data } = await axios.get(`${API}/dashboard/captain/${player}`)
  return data
}

const getGames = async (player) => {
  const { data } = await axios.get(`${API}/dashboard/games/${player}`)
  return data
}

const getTeam = async (player) => {
  const { data } = await axios.get(`${API}/dashboard/team/${player}`)
  return data
}

const getRanking = async () => {
  const { data } = await axios.get(`${API}/dashboard/ranking`)
  return data
}

const getFields = async () => {
  const { data } = await axios.get(`${API}/dashboard/fields`)
  return data
}

const getOverall = async () => {
  const { data } = await axios.get(`${API}/dashboard/overall`)
  return data
}

const getRankTeams = async () => {
  const { data } = await axios.get(`${API}/dashboard/rankteams`)
  return data
}

export {
  getGames,
  getCaptain,
  getFields,
  getOverall,
  getRanking,
  getTeam,
  getRankTeams
}
