import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/search", async (req, res) => {
  const q = req.query.q;

  const response = await fetch(
    "https://music.youtube.com/youtubei/v1/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB_REMIX",
            clientVersion: "1.20240101.01.00"
          }
        },
        query: q
      })
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running"));
