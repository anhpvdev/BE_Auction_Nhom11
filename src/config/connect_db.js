require("dotenv").config()
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.HOST ,
  user: process.env.USER ,
  password: process.env.PASSWORD ,
  database: process.env.DATABASE,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit: 0
})

console.log('conect ok')
module.exports = db