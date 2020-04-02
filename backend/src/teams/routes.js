import express from 'express'
import Joi from 'joi'
import request from 'request'
import logger from '../config/logger'
import requireAuth from '../auth/requireAuth'
import fs from 'fs'

function download(uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
    })
}

const router = express.Router()

router.get('/:photo', requireAuth('admin'), async (req, res) => {
  try {
    logger.info('GET /cep/:cep')
    const { value, error } = Joi.validate(
      req.params,
      Joi.object().keys({
        cep: Joi.string().required()
      })
    )
    if (error) { 
      return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) 
    }
    for (let i = 33; i < 50; i++) {
        download(
            'https://media.api-football.com/teams/' + i + '.png',
            newImageFolderPath + '' + i + '.png',
            function () {
                console.log('Page ' + (i + 1) + ' done')
            }
        );
    } 
    return res.send(data)
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error: 'Cep Inválido' })
  }
})

export default router
