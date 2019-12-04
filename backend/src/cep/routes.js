import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import axios from 'axios'

const router = express.Router()

router.get('/:cep', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /cep/:cep')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        cep: Joi.string().required()
      })
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    console.log(value.cep)
    const { data } = await axios.get(`  /ws/${value.cep}/json/`)
    return res.send(data)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Cep Inválido' })
  }
})

export default router
