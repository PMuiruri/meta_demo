import { useEffect, useState } from 'react';
import { OverviewCard, SimpleChart } from "./Card";
import { Row, H2, H3 } from './StyledComponents';

export const Stats = () =>{

  const [playerStats, setPlayerStats] = useState([]);
  const [guildstats, setGuildsStats] = useState([]);
  const [segmentStats, setSegmentStats] = useState([]);
  const [offerStats, setOfferStats] = useState([]);

  const fetchPlayerStats = () =>{
    fetch("http://localhost:3030/playerstats")
    .then(response => response.json())
    .then(data => {
      setPlayerStats(data)
    })
    .catch(error => console.log(error));
  };

  const fetchGuildsStats = () =>{
    fetch("http://localhost:3030/guildstats")
    .then(response => response.json())
    .then(data => {
      setGuildsStats(data)
    })
    .catch(error => console.log(error));
  };

  const fetchSegmentsStats = () =>{
    fetch("http://localhost:3030/segmentstats")
    .then(response => response.json())
    .then(data => {
      setSegmentStats(data)
    })
    .catch(error => console.log(error));
  };

  const fetchOfferStats = () =>{
    fetch("http://localhost:3030/offerstats")
    .then(response => response.json())
    .then(data => {
      setOfferStats(data)
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchPlayerStats();
    fetchGuildsStats();
    fetchSegmentsStats();
    fetchOfferStats();
  },[])

  return(
    <>
      <H2 green >Basic Statistics</H2>
      <Row>
        <OverviewCard name={'Highest Game Level'} amount={playerStats.maxlevel}/>
        <OverviewCard name={'Guilds with membership Above median'} amount={guildstats.numOfGuildsAboveMedian}/>
        <OverviewCard name={'Highest Total Logins'} amount={playerStats.maxlogins}/>
        <OverviewCard name={'Highest Total Spend'} amount={playerStats.maxspend}/>
      </Row>
      <Row>
        <OverviewCard name={'Median Game Level'} amount={playerStats.medianlevel}/>
        <OverviewCard name={'Median Number of members per Guild'} amount={guildstats.medianGuildMembers}/>
        <OverviewCard name={'Median Total Logins'} amount={playerStats.medianlogins}/>
        <OverviewCard name={'AVG Total Spend'} amount={playerStats.meanspend}/>
      </Row>
      <Row>
        <OverviewCard name={'Lowest Level'} amount={playerStats.minlevel}/>
        <OverviewCard name={'Guilds with Membership below median'} amount={guildstats.numOfGuildsBelowMedian}/>
        <OverviewCard name={'Lowest Total Logins'} amount={playerStats.minlogins}/>
        <OverviewCard name={'Amount of Users Below AVG Spend'} amount={playerStats.usersBelowMeanSpend}/>
      </Row>
      <Row>
        <H3 green style={{ alignSelf: 'center'}}>Players By Segment</H3>
        <SimpleChart data={segmentStats}/>
      </Row>
      <Row>
        <H3 green style={{ alignSelf: 'center'}}>Players By Offers/purchases</H3>
        <SimpleChart data={offerStats}/>
      </Row>
    </>
  )
}