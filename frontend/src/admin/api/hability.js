import axios from 'axios'

const API = process.env.VUE_APP_API

const get = async (player) => {
  const { data } = await axios.get(`${API}/hability/${player}`)
  return data
}

const create = async (
  player,
  pac,
  shot,
  pas,
  dri,
  def,
  phy,
  photo,
  overall,
  name,
  nacionality,
  club
) => {
  const fd = new FormData()
  fd.append('player', player)
  fd.append('pac', pac)
  fd.append('shot', shot)
  fd.append('pas', pas)
  fd.append('dri', dri)
  fd.append('def', def)
  fd.append('phy', phy)
  fd.append('file', photo, 'file')
  fd.append('overall', overall)
  fd.append('name', name)
  fd.append('nacionality', nacionality)
  fd.append('club', club)
  return axios.post(`${API}/hability`,
    fd,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  ).then(res => {
    console.log(res)
  })
}

const update = async (
  id,
  pac,
  shot,
  pas,
  dri,
  def,
  phy,
  photo,
  overall,
  name,
  nacionality,
  club
) => {
  return axios.put(`${API}/hability/${id}`, {
    id,
    pac,
    shot,
    pas,
    dri,
    def,
    phy,
    photo,
    overall,
    name,
    nacionality,
    club
  })
}

export {
  get,
  create,
  update
}
