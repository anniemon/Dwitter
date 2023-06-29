import { db } from '../db/database.js'

export async function create(name, username, password, email, url = "") {
  return db.execute(`INSERT INTO users (name, username, password, email, url) VALUES (?,?,?,?,?)`,
  [name, username, password, email, url]).then(result => result[0].insertId)
}

export async function get(username, requirePassword = false) {
  return db.execute(`SELECT * FROM users WHERE username=?`, [username])
  .then(result => result[0][0]);
}

export async function findById(id) {
  return db.execute(`SELECT * FROM users WHERE id=?`, [id]).then(result => result[0][0]);
}
