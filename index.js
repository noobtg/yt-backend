import express from "express";
import https from "https";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/search", (req, res) => {
  try {
    const query = req.query.q;

    if (!query) return res.json([]);

    const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
      query
    )}`;

    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const json = JSON.parse(data);

        const results = json[1].map((item, i) => ({
          id: i,
          title: item,
          url: `https://youtube.com/results?search_query=${encodeURIComponent(
            item
          )}`,
        }));

        res.json(results);
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
