import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, updateRent, remove } from './model'

const router = express.Router()

router.get('/by/:player', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /rent/by/:player')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const rents = await getAll(value.player)
    return res.send(rents)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /rent/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const rent = await get(value.id)
    return res.send(rent)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth(''), async (req, res) => {
  try {
    logger.info('POST /rent')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        player: Joi.number().integer().required(),
        field: Joi.number().integer().required(),
        price: Joi.number().required(),
        date: Joi.date().required(),
        hourIni: Joi.date().required(),
        hourEnd: Joi.date().required(),
        day: Joi.string().required()
      }),
    )
    if (error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] })  
    }
    await create(
      value.player,
      value.field,
      value.price,
      value.date,
      value.hourIni,
      value.hourEnd,
      value.day
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /rent/:id')
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
        player: Joi.integer().required(),
        field: Joi.integer().required(),
        price: Joi.number().required(),
        date: Joi.date().required(),
        hourIni: Joi.date().required(),
        hourEnd: Joi.date().required(),
        day: Joi.string().required()
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] })  
    }
    await update(
      params.value.id,
      body.value.player,
      body.value.field,
      body.value.price,
      body.value.date,
      body.value.hourIni,
      body.value.hourEnd,
      body.value.day
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})



router.put('/desactive/:id', requireAuth(''), async (req, res) => {
  try {
    logger.info('PUT /rent/desactive/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    console.log(value.id)
    await updateRent(value.id, true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
