import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, remove } from './model'

const router = express.Router()

router.get('/all/:team', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /teamAccept/all')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        team: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const teamAccepts = await getAll(value.team)
    return res.json(teamAccepts)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /teamAccept/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const teamAccept = await get(value.id)
    return res.send(teamAccept)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/delete/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('PUT /teamAccept/delete/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.string().required(),
      })
    )
    if (params.error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        active: Joi.boolean().required()
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    await remove(
      params.id,
      body.value.active
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
