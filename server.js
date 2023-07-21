const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const axios = require("axios");
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs"); // Set EJS as the template engine
app.use(express.static("public"));
// app.get("/", (req, res) => {
//   return res.json({
//     data: null,
//     message: "test server is up",
//   });
// });
app.get("/api/html-content", (req, res) => {
  const imagesArr = [
    "https://firebasestorage.googleapis.com/v0/b/productvisualizer-d7fa3.appspot.com/o/test_primarykey%2FCount%2FCount_0.jpg?alt=media&token=de05a2b4-99ac-4859-8bf0-593636209644",
    "https://firebasestorage.googleapis.com/v0/b/productvisualizer-d7fa3.appspot.com/o/test_primarykey%2FCount%2FCount_1.jpg?alt=media&token=89911f71-9cb9-4a11-bb9d-4ef4360caf15",
  ];
  let embedCode = `
    <iframe frameborder="0" style="width: 100%; height: 100%;">
      <div style="">`;

  // Add each image as a child of the iframe's container div
  imagesArr.forEach((image) => {
    embedCode += `
        <img src="${image}" height="300" width="300" style="margin: 5px;" />
    `;
  });

  embedCode += `
      </div>
    </iframe>`;

  // Set the response content type to HTML
  res.header("Content-Type", "text/html");

  // Send the embed code as the response
  res.send(embedCode);
});

// Function to fetch the embed code from the API
async function fetchEmbedCode() {
  try {
    const apiUrl = "/api/html-content"; // Replace with your actual API URL
    const response = await axios.post(apiUrl);

    if (!response.data || typeof response.data !== "string") {
      throw new Error("Invalid response from the API");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching embed code:", error.message);
    return ""; // Return an empty string in case of an error
  }
}

app.get("/", async (req, res) => {
  const embedCode = await fetchEmbedCode();
  res.render("index", { embedCode }); // Pass the embedCode as a variable to the EJS template
});

app.listen(PORT, () => {
  console.log(`LISTENING on PORT ${PORT}`);
});
