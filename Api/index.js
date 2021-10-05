const express = require("express");
// const mainroutes = require("./routes/mainroutes");
const fs = require("fs/promises");
const createCsvWriter = require("csv-writer").createArrayCsvWriter;

const app = express();
const hostname = "0.0.0.0";
const port = 8080;

const csvWriter = createCsvWriter({
  header: ["Quests"],
  path: "file.csv",
});

app.listen(port, () => {
  console.log(`App Running on port ${port || process.env.PORT}.`);
});
