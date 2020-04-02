import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, updateAccept, updateChallenge } from './model'
import { getAll as getAllPlayers } from '../teamPlayers/model'

import routePlayer from './routesPlayer'

const router = express.Router()

router.get('/all/:team', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /challenge/:team')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        team: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const challenges = await getAll(value.team)
    return res.send(challenges)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /challenge/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const challenge = await get(value.id)
    const players = await getAllPlayers(challenge.teamId)
    const object = [challenge, players]
    return res.send(object)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /challenge')
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
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
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

router.put('/accept/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /challenge/accept/:id')
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
        accept: Joi.boolean().required()
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
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

router.put('/victory/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /challenge/victory/:id')
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
        team: Joi.number().integer().required()
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
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

router.use('/player', routePlayer)

export default router
