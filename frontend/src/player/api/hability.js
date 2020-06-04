import axios from 'axios'

const API = process.env.VUE_APP_API

const config = {
  headers: {
    'Accept': '',
    'Content-Type': 'multipart/form-data'
  }
}

const getAll = async () => {
  const { data } = await axios.get(`${API}/hability/`)
  return data
}

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
  club,
  edit
) => {
  const validation = "profile_" + player + ".png"
  if(photo !== validation) {
    return axios.post(`${API}/hability`, {
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
        club,
        edit
      }
    )
  } else {
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
    fd.append('edit', edit)
    return axios.post(`${API}/hability`, fd, config)
  }
  
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
  getAll,
  get,
  create,
  update
}
