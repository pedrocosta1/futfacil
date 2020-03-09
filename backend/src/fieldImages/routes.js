import express from 'express'
import Joi from 'joi'
import fs from 'fs'
import multer from 'multer'
var upload = multer({ dest: 'frontend/public/img/fields' });

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, create, update, updatePhoto } from './model'
import routeClient from './routeClient'
const router = express.Router()

router.get('/:field', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /fieldList/:field')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        field: Joi.number().integer().required(),
      })
    )
    if(error){
      const errorFront = error.details.map(x => x.path)
      return res.status(400).send({ error: 'Validation error', fields: errorFront }) 
    }
    const fieldLists = await getAll(value.field)
    return res.send(fieldLists)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/', requireAuth('admin'), upload.array('file', 4), async (req, res) => {
  try {
    logger.info('POST /fieldList')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        field: Joi.number().integer().required(),
        photo: Joi.string().allow(null)
      }),
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await create(value.field)
    console.log(req.files)
    // if(req.files) {
    //   const renamePhoto = '../frontend/public/img/profiles/profile_' + id + '.png'
    //   fs.rename(req.files.path, renamePhoto, function(err) {
    //     if (err) throw err;
    //     console.log(err)
    //   })
    //   const photoName = "field_" + id + '.png'
    //   await updatePhoto(id, photoName)
    // }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', requireAuth('admin'), upload.array('file', 4), async (req, res) => {
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
        photo: Joi.string().allow(null)
      })
    )
    if (body.error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    await update(
      params.value.id,
      body.value.field
    )
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})


router.use('/client', routeClient)
export default router
