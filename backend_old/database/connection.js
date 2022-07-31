// const { MongoClient } = require("mongodb");
// const Db = process.env.MONGO_URI;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(  function (err, db) {
//       // Verify we got a good "db" object
//       if (db) {
//         _db = db.db("RUDRAKSHA");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//     });
//   },

//   getDb: function () {
//     return _db;
//   },
// };

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("CONNECTED TO DATABASE!");
};

module.exports = connectDB;
