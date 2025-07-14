
const express = require("express");
const app = express();

const  {adminAuth} = require{"./middleware/auth"};


app.use("/admin", adminAuth);
app.get("/admin/getdata", (req, res, next) =>{

    app.send("data sent to you");
})
app.get("/admin/delete", (req, res, next) =>{

    app.send("data deleted ");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




