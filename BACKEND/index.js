const express=require('express');
const app=express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


app.post('/register',async (req,res)=>{
    const {username,password,name} = req.body;
    const user = await usersCollection.findOne({username: username});
    if(user){
        return res.send({
            "message": "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await usersCollection.insertOne({username: username,password:hashedPassword, name:name})
    .then(()=>{
        res.send({
            "message": "user created"
        })
    })
    .catch((err)=>{
        console.log(err);
    })  
})







app.listen(4000,()=>{
    console.log("listening");
});
