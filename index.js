const express = require('express')
const cors = require( 'cors' );
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

//programmerumai0110100111
//programmerumai0110100111
//assignmentuser110101
//nodemon index.js
console.log(process.env.USER);
console.log(process.env.PASSWORD);



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yeymv.mongodb.net/?appName=Cluster0`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('__ UMAI SERVER-UMAI-SIMPLE CURD RUNNING IN UMAI WEBSITE SCREEN ')
})

app.listen(port, () => {
  console.log(`On tERMINAL _  _   UMAI app UMAI on port UMAI ${port}`)
})