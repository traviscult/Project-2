require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "passport_demo",
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "passport_demo",
    host: process.env.DB_HOST,
    dialect: "mysql2"
  },
  production: {
    "use_env_variable": "JAWSDB_URL",
    details: {
      dialect: "mysql"
    }
  }
}
