import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll } from './model'
const router = express.Router()

router.get('/:field', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /fieldList/player/:field')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        field: Joi.number().integer().required(),
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const fieldLists = await getAll(value.field)
    return res.send(fieldLists)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})


export default router
