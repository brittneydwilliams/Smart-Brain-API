const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


// const database = {
// 	users:[
// 	{
// 		 id: "123",
// 		 name: "John",
// 		 email: "john@gmail.com",
// 		 password: "pass",
// 		 entries: 0,
// 		 joined: new Date()
// 	},
// 		{
// 		 id: "456",
// 		 name: "Sally",
// 		 email: "sally@gmail.com",
// 		 password: "word",
// 		 entries: 0,
// 		 joined: new Date()
// 	}

// 	],
// 	login: [
// 		{
// 			id: "987",
// 			hash: "",
// 			email: "john@gmail.com"
// 		}
// 	]
// }

app.get("/", (req,res)=>{res.send(database.users)})

app.post("/signin", signin.handleSignin(db, bcrypt))

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)})
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)})


// bcrypt.hash(password, null, null, function(err, hash) {
// 		console.log(hash);
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



app.listen(process.env.PORT || 3000, () =>{
	console.log(`App is running on port ${process.env.PORT}`);
});

/*
/--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/