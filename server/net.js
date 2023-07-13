const { NeuralNetwork } = require("brain.js");
const fs = require("fs");
const net = new NeuralNetwork({ log: true,iterations:5000 });
const PATH = "./dataset.json";
const trainingData = readDataset();

function saveDataset(dataset, path = PATH) {
  fs.writeFileSync(path, JSON.stringify(dataset));
}
function readDataset(path = PATH) {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
}
//console.log("TRAINING")
net.train(trainingData);

function getOnePerk(obj) {
  let suitablePerk = { value: 0, name: "", img: "" };
  for (const key in obj) {
    if (suitablePerk.value < obj[key]) {
      suitablePerk.value = obj[key];
      suitablePerk.name = key;
      suitablePerk.img = `/static/${key}.webp`;
    }
  }
  return suitablePerk;
}

function getBuildPerks(perks) {
  const MAX_VALUE = 4;
  let sortedArray = [];

  for (const key in perks) {
    sortedArray.push([key, perks[key]]);
  }
  sortedArray.sort(function (a, b) {
    return b[1] - a[1];
  });

  let newArray = sortedArray.slice(0, MAX_VALUE);
  let build = [];
  for (const key of newArray) {
    build.push({ value: key[1], name: key[0], img: `/static/${key[0]}.webp` });
  }
  return build;
}

module.exports = { net, getOnePerk, getBuildPerks };
