const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB সংযোগ সেটআপ ✅ (সমস্যা ছিল না, তবে ক্লিন করা হয়েছে)
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yeymv.mongodb.net/?appName=Cluster0`;
// const uri = 'mongodb+srv://assignmentuser110101:RBEvcPZaW4m8ksVw@cluster0.yeymv.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    console.log("✅ MongoDB Connected Successfully!");

    const spotsCollection = client.db("spotDB").collection("spot");

    // 🔹 সব ডাটা দেখানোর API
    app.get('/spot', async (req, res) => {
      try {
        const cursor = spotsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch spots", details: error });
      }
    });

    // 🔹 নির্দিষ্ট একট ডাটা দেখানোর API
    app.get('/spot/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await spotsCollection.findOne(filter);

        if (!result) {
          return res.send({ message: "Spot not found" });
        }

        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch spot", details: error });
      }
    });

///////////////////////////////// Update Operation
app.put("/SpotUpdate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // যদি ID ঠিকঠাক না থাকে
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid Spot ID" });
    }

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatedData };

    const result = await spotsCollection.updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Spot not found or not updated" });
    }

    res.send({ message: "✅ Spot updated successfully!", result });
  } catch (error) {
    res.status(500).send({ error: "Failed to update spot", details: error });
  }
});
/////////////////////////////////
    // 🔹 নতুন ট্যুরিস্ট স্পট যোগ করা (POST API)
    app.post('/spot', async (req, res) => {
      try {
        const newSpot = req.body;
        console.log("📩 Received Data:", newSpot);

        const result = await spotsCollection.insertOne(newSpot);
        res.send({
          message: "✅ Data inserted successfully!",
          result,
          insertedId: result.insertedId || newSpot._id,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to insert data", details: error });
      }
    });

    // 🔹 ডিলিট API (DELETE API)
    app.delete('/spot/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await spotsCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Spot not found or already deleted" });
        }

        res.send({ message: "✅ Deleted Successfully!", result });
      } catch (error) {
        res.status(500).send({ error: "Failed to delete spot", details: error });
      }
    });

  } finally {
    // 🔹 এটা কমেন্ট করে রাখা হয়েছে যাতে সার্ভার বন্ধ না হয়
    // await client.close();
  }
}
run().catch(console.dir);

// ✅ Root API
app.get('/', (req, res) => {
  res.send('__ ✅ UMAI SERVER-UMAI-SIMPLE CURD RUNNING ✅ __');
});

// ✅ সার্ভার শুরু করা
app.listen(port, () => {
  console.log(`🚀 Server Running at: http://localhost:${port}`);
});
