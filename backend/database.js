// const { MongoClient } = require("mongodb");

// const url = "mongodb+srv://Meet-Dev:C7SJdEcDU0SWaGgx@meet-dev.ll2bgjx.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(url);
  
// async function main() {
//     await client.connect();
//     console.log("Connected successfully to MongoDB server");
//     const db = client.db("meet-dev");
//     const collection = db.collection("users");

//     // create firstname lastname city phoneNumber

//     const data = {
//         firstname: "Akshay",
//         lastname: "Sain",
//         city: "Delhi",
//         phoneNumber: "1234567890"       
//     };
//     const insertResult = await collection.insertOne(data);
//     console.log('Inserted document =>', insertResult);          
      


// // read

// const findResult = await collection.find({}).toArray();
//     console.log('Found documents =>', findResult);  




//     return 'done.'
// }

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

