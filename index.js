require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l9kydno.mongodb.net/?retryWrites=true&w=majority`;


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
    // await client.connect();
    // Send a ping to confirm a successful connection

    const blogsCollection = client.db("myPortfolio").collection("blogs")
    const galleryCollection = client.db("myPortfolio").collection("gallery")
    const testimonialCollection = client.db("myPortfolio").collection("testimonial")
    const contactCollection = client.db("myPortfolio").collection("contact")

    //getting blogs data endpoint
    app.get('/blogs', async(req, res) => {
      const result = await blogsCollection.find().toArray()
      res.send(result)
    })

    //for getting specific blog data
    app.get('/blogs/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await blogsCollection.findOne(query)
      res.send(result)
    })

    //getting all gallery image
    app.get('/gallery', async(req, res) => {
      const result = await galleryCollection.find().toArray()
      res.send(result)
    })
    
    //getting web gallery image
    app.get('/gallery/web', async(req, res) => {
      const result = await galleryCollection.find({category: 'web'}).toArray()
      res.send(result)
    })

    //getting ui gallery image
    app.get('/gallery/ui', async(req, res) => {
      const result = await galleryCollection.find({category: 'ui'}).toArray()
      res.send(result)
    })

    //getting ui gallery image
    app.get('/gallery/graphic', async(req, res) => {
      const result = await galleryCollection.find({category: 'graphic'}).toArray()
      res.send(result)
    })

    //getting testimonial data
    app.get('/testimonial', async(req, res) => {
      const result = await testimonialCollection.find().toArray()
      res.send(result)
    })

    //for posting contact info
    app.post('/contact', async(req, res) => {
      const contactInfo = req.body;
      const result = await contactCollection.insertOne(contactInfo)
      res.send(result)
    })
    

    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('My portfolio is here')
})

app.listen(port, () => {
    console.log(`My portfolio is running on port ${port}`);
})