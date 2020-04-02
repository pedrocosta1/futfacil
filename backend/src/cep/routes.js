import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import axios from 'axios'

const router = express.Router()

router.get('/:cep', async (req, res) => {
  try {
    logger.info('GET /cep/:cep')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        cep: Joi.string().required()
      })
    )
    value.cep = value.cep.replace('-','')
    if (error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const { data } = await axios.get(`https://viacep.com.br/ws/${value.cep}/json/`)
    return res.send(data)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Cep Inválido' })
  }
})

export default router
