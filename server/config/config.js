const env = require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'crewbuilder',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER,
    database: 'crewbuilder_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    'use-env-variable': 'DATABASE_URL'
  },
  facebook: {
    FB_CLIENT_ID: '356644548109752',
    FB_SECRET: '52ad76caab8dd22fbece177eb65aa942'
  }
};