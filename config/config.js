require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "jrbmf1rjnumqqbix",
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.DB_PASS,
    database: "jrbmf1rjnumqqbix",
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.DB_PASS,
    database: "jrbmf1rjnumqqbix",
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
}