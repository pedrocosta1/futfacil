import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { get, create, update, remove } from './model'

const router = express.Router()

router.get('/:player', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /player/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    const player = await get(value.player)
    return res.send(player)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /player/:id')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        player: Joi.number().integer().required(),
        pac: Joi.number().integer().required(),
        shot: Joi.number().integer().required(),
        pas: Joi.number().integer().required(),
        dri: Joi.number().integer().required(),
        def: Joi.number().integer().required(),
        phy: Joi.number().integer().required(),
        photo: Joi.string().allow(null),
        overall: Joi.number().integer().required(),
        name: Joi.string().required(),
        nacionality: Joi.string().required(),
        club: Joi.string().required()
      }),
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await create(
      value.player,
      value.pac,
      value.shot,
      value.pas,
      value.dri,
      value.def,
      value.phy,
      value.photo,
      value.overall,
      value.name,
      value.nacionality,
      value.club
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /player/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.string().required(),
      })
    )
    if (params.error) { 
      const errorFront = params.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        pac: Joi.number().integer().required(),
        shot: Joi.number().integer().required(),
        pas: Joi.number().integer().required(),
        dri: Joi.number().integer().required(),
        def: Joi.number().integer().required(),
        phy: Joi.number().integer().required(),
        photo: Joi.string().allow(null),
        overall: Joi.number().integer().required(),
        name: Joi.string().required(),
        nacionality: Joi.string().required(),
        club: Joi.string().required()
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await update(
      params.value.id,
      body.value.pac,
      body.value.shot,
      body.value.pas,
      body.value.dri,
      body.value.def,
      body.value.phy,
      body.value.photo,
      body.value.overall,
      body.value.name,
      body.value.nacionality,
      body.value.club
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
