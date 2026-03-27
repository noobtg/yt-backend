import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const url =
      "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
      encodeURIComponent(query);

    const response = await fetch(url);
    const data = await response.json();

    const results = data[1].map((item, index) => ({
      id: index,
      title: item,
      url: `https://www.youtube.com/results?search_query=${item}`,
    }));

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
