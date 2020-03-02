import express from 'express'
import Joi from 'joi'
import fs from 'fs'
import multer from 'multer'
var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    if (!fs.existsSync('../frontend/public/img/profiles')) {
      fs.mkdirSync('../frontend/public/img/profiles')
    }
    callback(null, '../frontend/public/img/profiles')
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + '_' + Date.now() + '.png')
  }
})
var upload = multer({
  storage: Storage
}).array('file', 3)


import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, getTeams, get, create, update, updatePhoto } from './model'


const router = express.Router()

router.get('/:player', async (req, res) => {
  try {
    logger.info('GET /player/:id')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        player: Joi.number().integer().required()
      })
    )
    if(error) {
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const player = await get(value.player)
    return res.send(player)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const Nacionalities = await Promise.all([
      getAll(),
      getTeams()
    ])
    return res.send(Nacionalities)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', async (req, res) => {
  try {
    logger.info('POST /hability')
    if(req.body.photo){
      upload(req, res, async function(err) {
        const photoName = req.files[0].filename
        if (err) {
            return res.end('Upload de foto deu errado')
        }
        const { value, error } = Joi.validate(
          req.body,
          Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
            player: Joi.number().integer().required(),
            pac: Joi.number().integer().required(),
            shot: Joi.number().integer().required(),
            pas: Joi.number().integer().required(),
            dri: Joi.number().integer().required(),
            def: Joi.number().integer().required(),
            phy: Joi.number().integer().required(),
            photo: Joi.string().allow(null),
            overall: Joi.number().integer().required(),
            name: Joi.string().required(),
            nacionality: Joi.string().required(),
            club: Joi.number().required(),
            edit: Joi.boolean().required()
          }),
        )
        if (error) { 
          const errorFront = error.details.map(x => x.message)
          return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
        }
        let id = 0
        if (value.edit){
          id = await update (
            value.id,
            value.player,
            value.pac,
            value.shot,
            value.pas,
            value.dri,
            value.def,
            value.phy,
            value.photo,
            value.overall,
            value.name,
            value.nacionality,
            value.club
          )
        } else {
          id = await create(
            value.player,
            value.pac,
            value.shot,
            value.pas,
            value.dri,
            value.def,
            value.phy,
            value.photo,
            value.overall,
            value.name,
            value.nacionality,
            value.club
          )
        }
        await updatePhoto(id, photoName)
      })
    } else {
      const { value, error } = Joi.validate(
        req.body,
        Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
          player: Joi.number().integer().required(),
            pac: Joi.number().integer().required(),
            shot: Joi.number().integer().required(),
            pas: Joi.number().integer().required(),
            dri: Joi.number().integer().required(),
            def: Joi.number().integer().required(),
            phy: Joi.number().integer().required(),
            photo: Joi.string().allow(null),
            overall: Joi.number().integer().required(),
            name: Joi.string().required(),
            nacionality: Joi.string().required(),
            club: Joi.number().required(),
            edit: Joi.boolean().required()
        }),
      )
      if (error) { 
        const errorFront = error.details.map(x => x.message)
        return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
      }
      let id = 0
      console.log(value.player)
      if (value.edit){
        id = await update (
          value.player,
          value.pac,
          value.shot,
          value.pas,
          value.dri,
          value.def,
          value.phy,
          value.photo,
          value.overall,
          value.name,
          value.nacionality,
          value.club
        )
      } else {
        id = await create(
          value.player,
          value.pac,
          value.shot,
          value.pas,
          value.dri,
          value.def,
          value.phy,
          value.photo,
          value.overall,
          value.name,
          value.nacionality,
          value.club
        )
      }
    }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    logger.info('POST /player/:id')
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
        pac: Joi.number().integer().required(),
        shot: Joi.number().integer().required(),
        pas: Joi.number().integer().required(),
        dri: Joi.number().integer().required(),
        def: Joi.number().integer().required(),
        phy: Joi.number().integer().required(),
        photo: Joi.string().allow(null),
        overall: Joi.number().integer().required(),
        name: Joi.string().required(),
        nacionality: Joi.string().required(),
        club: Joi.number().required()
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await update(
      params.value.id,
      body.value.pac,
      body.value.shot,
      body.value.pas,
      body.value.dri,
      body.value.def,
      body.value.phy,
      body.value.photo,
      body.value.overall,
      body.value.name,
      body.value.nacionality,
      body.value.club
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
