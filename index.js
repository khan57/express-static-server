const express = require("express");
const app = express();
const cors = require("cors");
const port = 5500 || process.env.PORT;

app.use(cors());

const images = [
  "https://firebasestorage.googleapis.com/v0/b/productvisualizer-d7fa3.appspot.com/o/test_primarykey%2FCount%2FCount_0.jpg?alt=media&token=de05a2b4-99ac-4859-8bf0-593636209644",
  "https://firebasestorage.googleapis.com/v0/b/productvisualizer-d7fa3.appspot.com/o/test_primarykey%2FCount%2FCount_1.jpg?alt=media&token=89911f71-9cb9-4a11-bb9d-4ef4360caf15",
];

app.get("/api/images", (req, res) => {
  res.json(images);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/embeded-code", (req, res) => {
  res.sendFile(__dirname + "/public/iframe.html");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
