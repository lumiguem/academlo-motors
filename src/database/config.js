const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'moreno@1987',
  database: 'dbmotorepair',
  port: 5432,
  logging: false,
});

module.exports = { db };
