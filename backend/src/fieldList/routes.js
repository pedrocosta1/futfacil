import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, getRentedFields, create, update, getRentedDetails, getRentedFieldsPlayer, getRentedDetailsPlayer } from './model'
import routeClient from './routeClient'
const router = express.Router()

router.get('/:id', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /fieldList/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const fieldList = await get(value.id)
    return res.send(fieldList)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/client/:id', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /fieldList/client/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const rentedList = await getRentedFields(value.id)
    return res.send(rentedList)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/player/:player', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /fieldList/player/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const rentedList = await getRentedFieldsPlayer(value.player)
    return res.send(rentedList)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/detailsplayer/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /fieldList/detailsplayer/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const rentedList = await getRentedDetailsPlayer(value.id)
    return res.send(rentedList)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/details/:id', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /fieldList/details/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const rentedList = await getRentedDetails(value.id)
    return res.send(rentedList)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:field/:active', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /fieldList/:field/:active')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        field: Joi.number().integer().required(),
        active: Joi.boolean().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    console.log(value.field)
    const fieldLists = await getAll(
      value.field,
      value.active
    )
    return res.send(fieldLists)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /fieldList')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        field: Joi.number().integer().required(),
        hourIni: Joi.date().required(),
        hourEnd: Joi.date().required(),
        day: Joi.string().required(),
      }),
    )
    if (error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    await create(
      value.field,
      value.hourIni,
      value.hourEnd,
      value.day,
      false
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('POST /fieldList/:id')
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
        field: Joi.number().integer().required(),
        hourIni: Joi.date().required(),
        hourEnd: Joi.date().required(),
        day: Joi.string().required(),
        active: Joi.boolean().required()
      })
    )
    if (body.error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    await update(
      params.value.id,
      body.value.field,
      body.value.hourIni,
      body.value.hourEnd,
      body.value.day,
      body.value.active
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.use('/client', routeClient)
export default router
