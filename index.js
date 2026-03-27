const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(
      `https://ytsearcher.vercel.app/api/search?q=${query}`
    );

    const results = response.data.results || [];

    const songs = results.map((item, index) => ({
      id: index + 1,
      title: item.title,
      artist: item.channel?.name || "Unknown",
      thumbnail: item.thumbnail,
      url: item.url
    }));

    res.json(songs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
