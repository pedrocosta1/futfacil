import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { get, getUser, create, update } from './model'

const router = express.Router()

router.get('/:user', requireAuth('client'), async (req, res) => {
  try {
    logger.info('GET /client/client/:user')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        user: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const client = await getUser(value.user)
    console.log(client)
    return res.send(client)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/client/:id', requireAuth('client'), async (req, res) => {
    try {
      logger.info('GET /client/client/id')
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
      const client = await get(value.id)
      return res.send(client)
    } catch (error) {
      logger.error(error)
      return res.status(400).send({ error: 'Internal error' })
    }
  })

router.put('/:id', requireAuth('client'), async (req, res) => {
  try {
    logger.info('POST /client/client/:id')
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
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
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

export default router
