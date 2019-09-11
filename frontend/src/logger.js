import axios from 'axios'

const levels = ['debug', 'info', 'warn', 'error']

const log = (level, message) => {
  const type = level === 'debug' ? 'log' : level
  // Console log for development
  if (process.env.NODE_ENV !== 'production') {
    console[type](message)
  }
  // Send log to API
  axios.post(`${process.env.VUE_APP_API}/log`, {
    from: process.env.CORDOVA_PLATFORM ? 'app' : 'web',
    level,
    message
  })
    .then(() => false)
    .catch(() => console.error('Error sending log'))
}

const logger = {
  level: process.env.VUE_APP_LOG
}

logger.debug = (message) => {
  if (levels.indexOf(logger.level) === 0) { log('debug', message) }
}

logger.info = (message) => {
  if (levels.indexOf(logger.level) <= 1) { log('info', message) }
}

logger.warn = (message) => {
  if (levels.indexOf(logger.level) <= 2) { log('warn', message) }
}

logger.error = (message) => {
  if (levels.indexOf(logger.level) <= 3) { log('error', message) }
}

export default logger
