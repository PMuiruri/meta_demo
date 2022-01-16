const express = require("express");
const axios = require("axios");
const app = express();
const port = 3030;

const getPlayers = () => {
  try {
    return axios.get('http://localhost:3000/players/?limit=100')
    .then(response => JSON.stringify(response.data));
  } catch (error) {
    console.error("Axios error: " + error);
  }
};

const getGuilds = () => {
  try {
    return axios.get('http://localhost:3000/guilds')
      .then(response => JSON.stringify(response.data));
  } catch (error) {
    console.error("Axios error: " + error);
  }
};

const getSegments = () => {
  try {
    return axios.get('http://localhost:3000/segments')
      .then(response => JSON.stringify(response.data));
  } catch (error) {
    console.error("Axios error: " + error);
  }
};

const getOffers = () => {
  try {
    return axios.get('http://localhost:3000/offers')
      .then(response => JSON.stringify(response.data));
  } catch (error) {
    console.error("Axios error: " + error);
  }
};

const getGuildMembers = (guild) => {
  try {
    return axios.get(`http://localhost:3000/players/?guild=${guild}`)
      .then(response => JSON.stringify(response.data));
  }
  catch (error) {
    console.error("Axios error: " + error);
  }
}

const getPlayerSegments = (segment) => {
  try {
    return axios.get(`http://localhost:3000/players/?segments=${segment}`)
      .then(response => JSON.stringify(response.data));
  }
  catch (error) {
    console.error("Axios error: " + error);
  }
}

const getPlayerPurchases = (offer) => {
  try {
    return axios.get(`http://localhost:3000/players/?purchases=${offer}`)
      .then(response => JSON.stringify(response.data));
  }
  catch (error) {
    console.error("Axios error: " + error);
  }
}

// Routes
app.get("/players", async (req, res, next) => {
  try {
    const players = await getPlayers();
    console.log(players.length)
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(players));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/guilds", async (req, res, next) => {
  try {
    const guilds = await getGuilds();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(guilds));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/segments", async (req, res, next) => {
  try {
    const segments = await getSegments();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(segments));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/offers", async (req, res, next) => {
  try {
    const offers = await getOffers();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(offers));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/guildMembers", async (req, res, next) => {
  console.log("Query " + req.query.guild);
  try {
    const members = await getGuildMembers(req.query.guild);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(members));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/playerSegments", async (req, res, next) => {
  console.log("Query " + req.query.segment);
  try {
    const players = await getPlayerSegments(req.query.segment);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(players));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/playerPurchases", async (req, res, next) => {
  console.log("Query " + req.query.offer);
  try {
    const players = await getPlayerPurchases(req.query.offer);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(players));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


app.listen(port, function () {
  console.log(`app listening on port ${port} Go to https://localhost:${port}/`);
});