import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, getRentedFields, create, update, getRentedDetails, getRentedFieldsPlayer, getRentedDetailsPlayer } from './model'
const router = express.Router()

router.get('/details/:id', requireAuth('client'), async (req, res) => {
  try {
    logger.info('GET /fieldList/details/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const rentedList = await getRentedDetails(value.id)
    return res.send(rentedList)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:field/:active', requireAuth('client'), async (req, res) => {
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
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
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

router.post('/', requireAuth('client'), async (req, res) => {
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
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
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

router.put('/:id', requireAuth('client'), async (req, res) => {
  try {
    logger.info('POST /fieldList/:id')
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
        field: Joi.number().integer().required(),
        hourIni: Joi.date().required(),
        hourEnd: Joi.date().required(),
        day: Joi.string().required(),
        active: Joi.boolean().required()
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
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

export default router
