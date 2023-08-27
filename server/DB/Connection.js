const mongoose = require("mongoose");


const db = "";


mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
}).then(() => console.log("Database Created....")).catch((error) => {
          console.log(error + "  Database not Connected ");
})