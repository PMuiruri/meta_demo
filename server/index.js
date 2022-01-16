const express = require("express");
const cors = require('cors')
const axios = require("axios");
const port = 3030;
const { min, max, median, mean } = require('mathjs')

const app = express();
app.use(cors())


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
//Players
app.get("/players", async (req, res, next) => {
  try {
    const players = await getPlayers();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(players));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/playerstats", async (req, res, next) => {
  try {
    const players = await getPlayers();
    res.header("Access-Control-Allow-Origin", "*");

    //level stats
    const levels = JSON.parse(players).map(item => item.level);
    const maxlevel = max(levels);
    const minlevel = min(levels);
    const medianlevel = median(levels);

    //login stats
    const logins = !players ? null : JSON.parse(players).map(item => item.totalLogins)
    const maxlogins = max(logins)
    const minlogins =  min(logins);
    const medianlogins = median(logins);
  
    //spend stats
    const spend = !players ? null : JSON.parse(players).map(item => item.totalSpend);
    const maxspend = max(spend);
    const minspend = min(spend);
    const meanspend = mean(spend).toFixed(2)
    
    const usersBelowMeanSpend = spend.filter(item => item < meanspend)

    res.status(200).json({
      'minlevel':minlevel,
      'medianlevel':medianlevel,
      'maxlevel': maxlevel,
      'minlogins': minlogins,
      'medianlogins': medianlogins,
      'maxlogins': maxlogins,
      'minspend': minspend,
      'meanspend': meanspend,
      'maxspend': maxspend,
      'usersBelowMeanSpend': usersBelowMeanSpend.length
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Guild
app.get("/guilds", async (req, res, next) => {
  try {
    const guilds = await getGuilds();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(guilds));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/guildstats", async (req, res, next) => {
  try {
    const guilds = await getGuilds();
    res.header("Access-Control-Allow-Origin", "*");

    const guildmemberscount = JSON.parse(guilds).map(item => {
      return {id: item.id, count: item.memberIds.length}
    })  
    // Guilds
    const GuildMembers = guildmemberscount.map(item => item.count)
  
    const maxGuildMembers = !GuildMembers.length ? null : max(GuildMembers)
    const medianGuildMembers = !GuildMembers.length ? null : median(GuildMembers)
    const minGuildMembers = !GuildMembers.length ? null : min(GuildMembers)
    
    const numOfEmptyGuilds = GuildMembers.filter(item => item === 0)
    const numOfGuildsBelowMedian = GuildMembers.filter(item => item <= medianGuildMembers)
    const numOfGuildsAboveMedian = GuildMembers.filter(item => item > medianGuildMembers)

    res.status(200).json({
      'minGuildMembers': minGuildMembers,
      'medianGuildMembers':medianGuildMembers,
      'maxGuildMembership': maxGuildMembers,
      'numOfEmptyGuilds': numOfEmptyGuilds.length,
      'numOfGuildsBelowMedian': numOfGuildsBelowMedian.length,
      'numOfGuildsAboveMedian': numOfGuildsAboveMedian.length,
    });
  } catch (error) {
    console.log('guildstats endpoint failed')
    res.status(500).send(error.toString());
  }
});
//Segments
app.get("/segments", async (req, res, next) => {
  try {
    const segments = await getSegments();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(segments));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/segmentstats", async (req, res, next) => {
  try {
    const segments = await getSegments();
    const players = await getPlayers();
    res.header("Access-Control-Allow-Origin", "*");
    const segmentStats = JSON.parse(segments).flatMap(segment =>{
      let stat = JSON.parse(players).filter(player => player.segments.includes(segment.id))
      return {name: segment.id, stats: stat.length}
     })
    res.status(200).json(segmentStats);
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

app.get("/offerstats", async (req, res, next) => {
  try {
    const offers = await getOffers();
    const players = await getPlayers();
    res.header("Access-Control-Allow-Origin", "*");
    const offerStats = JSON.parse(offers).flatMap(offer =>{
      let stat = JSON.parse(players).filter(player => player.purchases.includes(offer.id))
       return {name: offer.id, stats: stat.length}
    })
    res.status(200).json(offerStats);
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