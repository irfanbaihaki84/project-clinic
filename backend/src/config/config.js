// Configuration file for the application
module.exports = {
  development: {
    username: 'postgres',
    password: '123456',
    database: 'clinic_db',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
