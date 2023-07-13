require("dotenv").config();
const { net, getBuildPerks, getOnePerk } = require("./net.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/api/one-perk", (req, res) => {
  const { stealth, chase, heal, aura, repair, save, fun } = req.query;
  const result = net.run({ stealth, chase, heal, aura, repair, save, fun });

  console.log(getOnePerk(result));
  res.send(getOnePerk(result));
});

app.get("/api/get-build", (req, res) => {
  const { stealth, chase, heal, aura, repair, save, fun } = req.query;
  const result = net.run({ stealth, chase, heal, aura, repair, save, fun });

  console.log(getBuildPerks(result));
  res.send(getBuildPerks(result));
});

app.listen(port, () => {
  console.log(`Server is listening the port ${port}`);
});
