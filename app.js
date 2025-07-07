// EP -16 : Setting up a basic Express server
// This code sets up a simple Express server that listens on port 3000 and responds with        

const express = require("express")

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from the home!");
}); 

app.get("/test", (req, res) => {
    res.send("Hello from the test!");
}); 

app.listen(3000, () => {
    console.log("Server is running on port 3000");  
});



