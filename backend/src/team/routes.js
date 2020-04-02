import express from 'express'
import Joi from 'joi'
import fs from 'fs'
import multer from 'multer'

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, get, create, update, updatePhoto, remove, getAllTeamChallenge } from './model'
var upload = multer({ dest: 'frontend/public/img/teams' });

const router = express.Router()

router.get('/', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /team/')
    const teams = await getAll()
    return res.json(teams)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/challenge/:player', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /team/challenge/:player')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const teams = await getAllTeamChallenge(value.player)
    return res.send(teams)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('GET /team/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        id: Joi.number().integer().required()
      })
    )
    if(error){
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const team = await get(value.id)
    return res.send(team)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('player'), upload.single('logo'), async (req, res) => {
  try {
    logger.info('POST /team/')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        player: Joi.number().integer().required(),
        logo: Joi.string().allow(null)
      }),
    )
    if (error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const id = await create(
      value.name,
      value.player,
      value.logo,
    )
    if(req.file) {
      const renamePhoto = '../frontend/public/img/teams/team_' + id + '.png'
      fs.rename(req.file.path, renamePhoto, function(err) {
        if (err) throw err;
        console.log(err)
      })
      const photoName = "team_" + id + '.png'
      await updatePhoto(id, photoName)
    }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('player'), upload.single('logo'), async (req, res) => {
  try {
    logger.info('PUT /team/:id')
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
        player: Joi.number().integer().required(),
        logo: Joi.string().allow(null)
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await update(
      params.value.id,
      body.value.name,
      body.value.player,
      body.value.logo,
    )
    if(req.file) {
      const renamePhoto = '../frontend/public/img/teams/team_' + params.value.id + '.png'
      fs.rename(req.file.path, renamePhoto, function(err) {
        if (err) throw err;
        console.log(err)
      })
      const photoName = "team_" + params.value.id + '.png'
      await updatePhoto(id, photoName)
    }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/delete/:id', requireAuth('player'), async (req, res) => {
  try {
    logger.info('PUT /team/delete/:id')
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
        active: Joi.boolean().required()
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await remove(
      params.value.id,
      body.value.active
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
