import express from 'express'
import Joi from 'joi'
import fs from 'fs'
import multer from 'multer'
var upload = multer({ dest: 'frontend/public/img/profiles' });


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
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    const player = await get(value.player)
    return res.send(player)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.get('/', requireAuth(''), async (req, res) => {
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

router.post('/',  requireAuth(''), upload.single('file'), async (req, res) => {
  try {
    logger.info('POST /hability')
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
        return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
      }
      let id = 0
      if (value.edit){
        await update (
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
        id = value.player
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
      if(req.file) {
        const renamePhoto = '../frontend/public/img/profiles/profile_' + id + '.png'
        fs.rename(req.file.path, renamePhoto, function(err) {
          if (err) throw err;
          console.log(err)
        })
        const photoName = "profile_" + id + '.png'
        await updatePhoto(id, photoName, value.edit)
      }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
