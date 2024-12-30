require('dotenv').config();
const config = {
  SERVERPORT: process.env.SERVERPORT,
  DBPORT: process.env.DBPORT,
  DBHOST: process.env.DBHOST,
  DBUSER: process.env.DBUSER,
  DBPASS: process.env.DBPASS,
  DBNAME: process.env.DBNAME,
};

module.exports = config;