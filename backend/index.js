const express = require("express");
const cors = require("cors");
const headlines = require("./headlines");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); 
  const reviews = Math.floor(Math.random() * 500 + 50);        


  const randomIndex = Math.floor(Math.random() * headlines.length);
  const rawHeadline = headlines[randomIndex];

  
  const headline = rawHeadline
    .replace(/Cake & Co/g, name)
    .replace(/Mumbai/g, location);

  res.json({ rating, reviews, headline });
});

app.get("/regenerate-headline", (req, res) => {
  const { name = "Cake & Co", location = "Mumbai" } = req.query;
  const randomIndex = Math.floor(Math.random() * headlines.length);
  const rawHeadline = headlines[randomIndex];
  const headline = rawHeadline
    .replace(/Cake & Co/g, name)
    .replace(/Mumbai/g, location);
  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
