require('dotenv').config()

const express = require('express')
const mime = require('mime-types')
const path = require('path')
const app = express()
const port = 8078

const dbreq = require('pg');
const credentials = {
    user: "postgres",
    host: "192.168.1.105",
    database: "nodedemo",
    password: "1",
    port: 5432,
};

const root = path.join(__dirname, 'public')

function setHeaders(res, path) {
  if (path.endsWith('.gz') || path.endsWith('.br')) {
    res.set({
      'Content-Type': mime.lookup(path.substr(0, path.length - 3)) || 'application/octet-stream',
      'Content-Encoding': path.endsWith('.gz') ? 'gzip' : 'brotli',
    })
  }
}

app.get('/api/env', (req, res) => {
  res.header('Content-Type', 'application/json')

  // Filter out all envs that start with PUBLIC-
  const filtered = Object.keys(process.env)
    .filter(key => key.startsWith('PUBLIC-'))
    .reduce((obj, key) => {
      let v = process.env[key]
      let k = key.replace('PUBLIC-', '')
      obj[k] = v
      return obj
    }, {})

  res.send(JSON.stringify(filtered, null, 4))
})

app.get('/api/env/:val', (req, res) => {
  const val = req.params.val.startsWith('PUBLIC-') ? req.params.val : `PUBLIC-${req.params.val}`
  const value = process.env[val]

  console.log(`[ GET ] [ API ] /api/${val.replace('PUBLIC-', '')} => ${value}`)
  res.send(value)
})

app.get('/getdb', async (req, res) => {
  res.header('Content-Type', 'application/json')
  const client = new dbreq.Pool(credentials);
  const dateNow = new Date();
  let dateFuture = new Date(dateNow.setMinutes(dateNow.getMinutes() + 20));
  dateFuture = dateFuture.setHours(
	dateFuture.getHours() + 6);
  const formatDate = new Date(dateFuture)
    .toISOString()
    .replace('T', ' ')
    .replace(/\..+$/, '');
  await client.query(`UPDATE films SET did = did + 1, time_fishing = '${formatDate}';`);
  const now = await client.query("SELECT did, time_fishing FROM films;");
  await client.end();
  const resPrep = {
    "did": now.rows[0]["did"],
    "time": now.rows[0]["time_fishing"].toISOString()
  };
  res.send(JSON.stringify( resPrep ));
})

app.use(express.static(root, { setHeaders: setHeaders }))

app.listen(port, () => {
  console.log(`Unity WEBGL server listening at http://localhost:${port}`)
})