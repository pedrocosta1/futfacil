import axios from 'axios'

const API = process.env.VUE_APP_API

const config = {
  headers: {
    'Accept': '',
    'Content-Type': 'multipart/form-data'
  }
}

const get = async (field) => {
  const { data } = await axios.get(`${API}/fieldImages/client/${field}`)
  return data
}

const create = async (
  field,
  photo
) => {
  const fd = new FormData()
  if(photo.length > 0) {
    for( var i = 0; i < photo.length; i++ ){
      let file = photo[i];
      fd.append('files', file);
    }
  }
    fd.append('field', field) 
    return axios.post(`${API}/fieldImages/client`, fd, config)
}

const update = async (
  id,
  photo
) => {
  const form = new FormData()
  form.append('id', id)
  form.append('file', photo)
    return axios.post(`${API}/fieldImages/client/edit`, form, config)
}

export {
  get,
  create,
  update
}
