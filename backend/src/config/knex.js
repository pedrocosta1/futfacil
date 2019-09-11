require('dotenv').config()
const knexStringcase = require('knex-stringcase')

// Converts Postgres snake_case to camelCase
const options = knexStringcase({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
})

// Connects to Database
const knex = require('knex')(options)

export default knex
