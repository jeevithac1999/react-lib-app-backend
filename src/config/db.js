const mongoose = require("mongoose");

mongoose.connect(process.env.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "library"
})
  .then(console.log("Database connected"))
  .catch(console.error);

const db = mongoose.connection;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

db.on('error', error => {
  console.log("MongoDB Connection Error")
  console.error(error)
});

module.exports = db;

