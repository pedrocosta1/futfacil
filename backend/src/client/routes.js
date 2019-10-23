import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, remove } from './model'

const router = express.Router()

router.get('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /client')
    const clients = await getAll()
    return res.send(clients)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /client/:id')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    const client = await get()
    return res.send(client)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /client/:id')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postal: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().integer().required()
      }),
    )
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    await create(
      value.name,
      value.phone,
      value.city,
      value.state,
      value.postal,
      value.street,
      value.number
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /client/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.string().required(),
      })
    )
    if (params.value.id) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    const body = Joi.validate(
      req.body,
      Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postal: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().integer().required()
      })
    )
    if (body.value.error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    await update(
      params.value.id,
      body.value.name,
      body.value.phone,
      body.value.city,
      body.value.state,
      body.value.postal,
      body.value.street,
      body.value.number
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
