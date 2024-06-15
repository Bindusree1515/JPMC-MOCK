const express=require('express');
const app=express();

const mongoClient = require('mongodb').MongoClient;

const cors = require('cors')

app.use(express.json);
app.use(cors())

mongoClient.connect(process.env.MONGODB_URI)
.then((client)=>{
    const db= client.db('jpmc');
    const usersCollection = db.collection('users');
})
.catch((err)=>{
    console.log(err);
})
app.get('/',(req,res)=>{
    res.send({
        "message": "you reached straw hacks"
    })
})










app.listen(4000,()=>{
    console.log("listening");
});
