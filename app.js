// EP -16 : Setting up a basic Express server
// This code sets up a simple Express server that listens on port 3000 and responds with        

const express = require("express");

const app = express();
app.use("/user", (req, res ,next) => {
    console.log("This is the first middleware function");
    next();
    res.send("Hello from the use middleware!");
    
},
 (req, res, next) =>{
    console.log("This is the second middleware function");
    res.send("Hello from the second middleware!");
    next();     
 });


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




