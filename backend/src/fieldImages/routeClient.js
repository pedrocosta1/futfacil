import express from 'express'
import Joi from 'joi'
import fs from 'fs'
import multer from 'multer'
var upload = multer({ dest: 'frontend/public/img/fields' });

import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import { getAll, create, getCount, updatePhoto } from './model'
const router = express.Router()

router.get('/:field', requireAuth('client'), async (req, res) => {
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

router.post('/', requireAuth('client'), upload.array('files', 10), async (req, res) => {
  try {
    logger.info('POST /fieldList')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        field: Joi.number().integer().required()
      }),
    )
    if (error) { 
      const errorFront = error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    const countImagesData = await getCount(value.field)
    if(countImagesData.imageNumber < 4) {
      if(req.files) {
        let countImages = 0
        if(countImagesData.imageNumber === 0) countImages = 3
        else if( countImagesData.imageNumber === 1 ) countImages = 2
        else if( countImagesData.imageNumber === 2 ) countImages = 1
        else countImages = 1
        console.log(countImages)
        console.log(countImagesData)
        for(let i = 0; i < countImages; i++ ){
          const id = await create(value.field)
          const renamePhoto = '../frontend/public/img/fields/field_' + id + '.png'
          if(req.files[i].path){
            fs.rename(req.files[i].path, renamePhoto, function(err) {
              if (err) throw err;
              console.log(err)
            })
            const photoName = "field_" + id + '.png'
            await updatePhoto(id, photoName)
          }
        }
      }
    } else {
      res.send(false)
    }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.post('/edit', requireAuth('client'), upload.single('file'), async (req, res) => {
  try {
    logger.info('PUT /fieldImages/:id')
    const { value, error } = Joi.validate(
      req.body,
      Joi.object({ abortEarly: true }).options({ abortEarly: false }).keys({
        id: Joi.number().integer().required()
      }),
    )
    if (error) {
      const errorFront = body.error.details.map(x => x.message)
      return res.status(400).send({ error: 'Validation error', fields: [errorFront] }) 
    }
    if(req.file) {
      const renamePhoto = '../frontend/public/img/fields/field_' + value.id + '.png'
      fs.rename(req.file.path, renamePhoto, function(err) {
        if (err) throw err;
        console.log(err)
      })
      const photoName = "field_" + value.id + '.png'
      await updatePhoto(value.id, photoName)
    }
    return res.send(true)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router
