import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, remove } from './model'

const router = express.Router()

router.get('/:player', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /creditCard/:player')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', creditCards: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const creditCards = await getAll(value.player)
    return res.json(creditCards)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/player/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /creditCard/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', creditCards: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const creditCard = await get(value.id)
    return res.send(creditCard)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('player'), async (req, res) => {
  try {
    logger.info('POST /creditCard')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        flag: Joi.string().required(),
        numberCard: Joi.string().required(),
        validation: Joi.string().required(),
        ccv: Joi.string().required(),
        name: Joi.string().required(),
        player: Joi.number().integer().required()
      }),
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', creditCards: [errorFront] }) 
    }
    await create(
      value.flag,
      value.numberCard,
      value.validation,
      value.ccv,
      value.name,
      value.player
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('PUT /creditCard/:id')
    const params = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required(),
      })
    )
    if (params.error) { 
      return res.status(400).send({ error: 'Validation error', creditCards: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const body = Joi.validate(
      req.body,
      Joi.object().options({ abortEarly: false }).keys({
        flag: Joi.string().required(),
        numberCard: Joi.string().required(),
        validation: Joi.string().required(),
        ccv: Joi.string().required(),
        name: Joi.string().required(),
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', creditCards: [errorFront] }) 
    }
    await update(
      params.value.id,
      body.value.flag,
      body.value.numberCard,
      body.value.validation,
      body.value.ccv,
      body.value.name,
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.delete('/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('DEL /creditCard/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', creditCards: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const creditCard = await remove(value.id)
    return res.send(creditCard)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
