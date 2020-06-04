import express from 'express'
import Joi from 'joi'


import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getTeam, getClientRanking, getFields, getTeamCaptain, getTeamOverall, getGames, getRankTeams } from './model'


const router = express.Router()

router.get('/team/:player', async (req, res) => {
  try {
    logger.info('GET /team/player/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const player = await getTeam(value.player)
    return res.send(player)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/games/:player', async (req, res) => {
  try {
    logger.info('GET /player/games/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const player = await getGames(value.player)
    return res.send(player)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/captain/:player', async (req, res) => {
  try {
    logger.info('GET /player/captain/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error) {
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const player = await getTeamCaptain(value.player)
    return res.send(player)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/ranking', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /player/ranking')
    const object = await Promise.all([
      getClientRanking(),
      getFields()
    ])
    return res.send(object)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/fields', requireAuth(''), async (req, res) => {
  try {
    logger.info('GET /player/fields')
    const fields = await getFields()
    return res.send(fields)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/overall', requireAuth(''), async (req, res) => {
  try {
    const overall = await getTeamOverall()
    return res.send(overall)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/rankteams', requireAuth(''), async (req, res) => {
  try {
    const teams = await getRankTeams()
    return res.send(teams)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
