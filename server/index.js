const express = require("express");
const app = express();
require("./DB/Connection");
const port = 4000;


app.get("/", (req, res) => {
          console.log("Server Created...");
})


app.listen(port, () => {
          console.log(`Server is running on ${port}`);
})