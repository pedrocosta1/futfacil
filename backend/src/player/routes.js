import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, remove } from './model'
import routesPlayer from './routesPlayer'

const router = express.Router()

router.get('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /player')
    const players = await getAll()
    return res.send(players)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /player/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const player = await get(value.id)
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
        name: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postal: Joi.string().required(),
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        number: Joi.number().integer().allow(null),
        description: Joi.string().allow(null)
      }),
    )
    if (error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] })  
    }
    await create(
      value.name,
      value.phone,
      value.city,
      value.state,
      value.postal,
      value.street,
      value.number,
      value.neighborhood,
      value.description
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
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postal: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().integer().allow(null),
        neighborhood: Joi.string().required(),
        description: Joi.string().allow(null)
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    await update(
      params.value.id,
      body.value.name,
      body.value.phone,
      body.value.city,
      body.value.state,
      body.value.postal,
      body.value.street,
      body.value.number,
      body.value.neighborhood,
      body.value.description
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})
router.use('/player', routesPlayer)
export default router
