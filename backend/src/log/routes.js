import express from 'express'
import Joi from 'joi'

import logger from '../config/logger'
import knex from '../config/knex'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    // logger.info('REQ /api/log')
    // Validate request
    const { value, error } = Joi.validate(
      req.body,
      Joi.object().keys({
        from: Joi.string().required(),
        level: Joi.string().required(),
        message: Joi.string().required()
      })
    )
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }
    // Save log to database
    await knex('log').insert({
			from: value.from,
			level: value.level,
			message: value.message
    })
    res.send({ status: true })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
