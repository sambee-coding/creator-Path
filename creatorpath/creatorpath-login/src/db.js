const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "sambee",
  database: process.env.DB_NAME || "creatorpath",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
