app.get("/search", async (req, res) => {
  const q = req.query.q;

  const response = await axios.post(
    "https://music.youtube.com/youtubei/v1/search?key=AIzaSy...",
    {
      query: q,
      context: {
        client: {
          clientName: "WEB_REMIX",
          clientVersion: "1.20240401.01.00"
        }
      }
    }
  );

  const items =
    response.data.contents.tabbedSearchResultsRenderer.tabs[0]
      .tabRenderer.content.sectionListRenderer.contents;

  let songs = [];

  items.forEach(section => {
    const contents =
      section.musicShelfRenderer?.contents || [];

    contents.forEach(item => {
      const data = item.musicResponsiveListItemRenderer;
      if (!data) return;

      const title = data.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
      const artist = data.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;

      songs.push({
        title,
        artist
      });
    });
  });

  res.json(songs);
});
