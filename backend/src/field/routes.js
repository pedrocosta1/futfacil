import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, getFields, create, update, remove } from './model'

const router = express.Router()

router.get('/by/:client', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /field/:client')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        client: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const fields = await getAll(value.client)
    return res.json(fields)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /field/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const field = await get(value.id)
    return res.send(field)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /field/all/:id')
    const fields = await getFields()
    console.log(fields)
    return res.send(fields)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth(''), async (req, res) => {
  try {
    logger.info('POST /field/:id')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        client: Joi.number().integer().required(),
        type: Joi.string().required(),
        size: Joi.number().integer().required(),
        maxPerson: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
        hourPrice: Joi.number().integer().allow(null)
      }),
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await create(
      value.name,
      value.client,
      value.type,
      value.size,
      value.maxPerson,
      value.price,
      value.hourPrice
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth(''), async (req, res) => {
  try {
    logger.info('POST /field/:id')
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
        client: Joi.number().integer().required(),
        type: Joi.string().required(),
        size: Joi.number().integer().required(),
        maxPerson: Joi.number().integer().required(),
        price: Joi.number().required(),
        hourPrice: Joi.number().integer().allow(null)
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await update(
      params.value.id,
      body.value.name,
      body.value.client,
      body.value.type,
      body.value.size,
      body.value.maxPerson,
      body.value.price,
      body.value.hourPrice
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
