const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require("body-parser");
const passport=require('passport');

/**const crypto=require('crypto');
const multer=require('multer');
const GridStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const methodOverride=require('method-override'); */



const users=require("./routes/api/users");
const posts=require("./routes/api/profile.js");
const profile=require("./routes/api/profile");
const order=require('./routes/api/orders');


//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const db=require('./config/keys').mongoUrl;
//connect to MongoDb
mongoose.connect(db)
        .then(()=>console.log("mongodb connected"))
        .catch(err=>console.log(err));


//passport middleware
app.use(passport.initialize());

//passport config strategy
require('./config/passport')(passport);




//routes
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);
app.use('/api/order',order);




const port=5000 || process.env.port;

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})