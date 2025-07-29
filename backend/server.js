const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors')
const bodyparser = require("body-parser");
dotenv.config();
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
const port = 3000;
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
client.connect();
// Database Name
const dbName = "My-Passwords-APP";
app.use(bodyparser.json());
app.use(cors())
//fetch passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("records");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});
//add passwords
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("records");
  const findResult = await collection.insertOne(password);
  res.json({ success: true, result: findResult });
});
//edit passwords
app.put("/", async (req, res) => {
  const { id, ...updatedData } = req.body;

  // Remove _id if it exists to avoid immutable field error
  if (updatedData._id) {
    delete updatedData._id;
  }

  const db = client.db(dbName);
  const collection = db.collection("records");
  const findResult = await collection.updateOne({ id }, { $set: updatedData });

  res.json({ success: true, result: findResult });
});

//delete password using id
app.delete("/", async (req, res) => {
  const {id} = req.body;
  const db = client.db(dbName);
  const collection = db.collection("records");
  const findResult = await collection.deleteOne({id});
  res.json({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
