const express = require('express')
const cors = require( 'cors' );
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mongodbCOPYpaste START
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yeymv.mongodb.net/?appName=Cluster0`;


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
///////// ER NICHE app.post

    const spotsCollection = client.db("spotDB").collection("spot"); // তোমার কালেকশন


    //dekhanor kaj Get
    app.get('/spot', async(req, res) => {
      const cursor = spotsCollection.find();
      result = await cursor.toArray();
       res.send(result);
    })
    // ✅ `app.post()` রান ফাংশনের ভিতরে
    app.post('/spot', async (req, res) => {
      try {
        const newSpot = req.body;
        console.log("Received Data:", newSpot);

        // MongoDB-তে ডাটা ইনসার্ট করা
        const result = await spotsCollection.insertOne(newSpot);

        res.send({ message: "Data inserted successfully!", result ,
          insertedId: result.insertedId || newData._id
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to insert data", details: error });
      }
    });
// Delete opertion///////
app.delete('/spot/:id',async (req, res) => {
      const id = req.params.id;
      // const query = { _id: new Object(id) };
      const query = { _id: new ObjectId(id) }; 
      const result = await spotsCollection.deleteOne(query);
      res.send(result);
});

///////// ER UPORE app.post
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
                                                                               // Ensures that the client will close when you finish/error
    // await client.close(); //pore comment kora jate sobsomoy cholte na thake
  }
}
run().catch(console.dir);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mongodbCOPYpaste END


app.get('/', (req, res) => {
    res.send('__ UMAI SERVER-UMAI-SIMPLE CURD RUNNING IN UMAI WEBSITE SCREEN ')
})

app.listen(port, () => {
  console.log(`On123456789...tERMINAL- - -- -  _  _   UMAI app UMAI on port UMAI ${port}`)
  console.log('server cholce: http://localhost:5000');
})

console.log(port);
console.log(port);
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(port);
console.log(port);
// OlD CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE   OLDDDDDD    OOOOLLLLLDDDDDDDD