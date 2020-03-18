import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, updateAccept } from './model'

const router = express.Router()

router.get('/all/:team', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /challenge/player/all/:team')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        team: Joi.number().integer().required()
      })
    )
    if(error){
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const challenges = await getAll(value.team)
    return res.send(challenges)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /challenge/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const challenge = await get(value.id)
    return res.send(challenge)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('player'), async (req, res) => {
  try {
    logger.info('POST /challenge/player')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        team1: Joi.number().integer().required(),
        team2: Joi.number().integer().required(),
        date: Joi.date().required(),
        field: Joi.number().integer().required(),
        victory: Joi.number().integer().allow(null),
        happend: Joi.number().integer().allow(null)
      }),
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await create(
      value.team1,
      value.team2,
      value.date,
      value.field,
      value.victory,
      value.happend
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/accept/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('POST /challenge/player/accept/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.string().required(),
      })
    )
    if (params.error) { 
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        accept: Joi.boolean().required()
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    console.log(params.value.id)
    await updateAccept(
      params.value.id,
      body.value.accept
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/victory/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('POST /challenge/player/victory/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.string().required(),
      })
    )
    if (params.error) { 
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        team: Joi.number().integer().required()
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await updateChallenge(
      params.value.id,
      body.value.team
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
