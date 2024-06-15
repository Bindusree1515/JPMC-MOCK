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

app.post("/login" ,async (req,res) => {
    //get users and authors collecion object
  const userCollection = req.app.get("userCollection");
  const authorCollection = req.app.get("authorCollection");

  //get user or autrhor
  const userCred = req.body;
  //verifuy username of user
  
    let dbuser = await userCollection.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "Invalid username" });
    } else {
      let status = await bcryptjs.compare(userCred.password, dbuser.password);
      // console.log("status",status)
      if (status === false) {
        return res.send({ message: "Invalid password" });
      } else {
        //create token
        const signedToken = jwt.sign(
          { username: dbuser.username },process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
  }
})










app.listen(4000,()=>{
    console.log("listening");
});
