const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();
// Get all the Passwords
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save all the Passwords
app.post('/', async(req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

// Delete a the Passwords by id
app.delete('/', async(req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})