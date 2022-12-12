require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path =  require('path');
const authRoute = require("./routes/auth")
const toDosRoute = require("./routes/todos");

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api",(req,res)=> {
    res.send("This is react with backend");
});

app.post("/name", (req,res) =>{
    if(req.body.name) {
        return res.json({
            name: req.body.name
        });
    } else {
        return res.status(400).json({
            error: "No name provided"
        });
    }
})

app.use("/api/auth", authRoute)
app.use("/api/todos", toDosRoute)

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to database")
    
        app.listen(process.env.PORT,() =>{
            console.log(`Server running on port ${process.env.PORT}`)
        })
    }).catch((error)=>{
        console.log(error);
    });
    





