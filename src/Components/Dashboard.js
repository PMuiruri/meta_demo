import { useEffect, useState } from 'react';
import { DashboardCard } from './Card';
import { Players } from './Players';
import { Row } from './StyledComponents';

export const Dashboard = () => {

  const [players, setPlayers] = useState([]);
  const [guilds, setGuilds] = useState([]);
  const [segments, setSegments] = useState([]);
  const [offers, setOffers] = useState([]);


  const fetchPlayers = () =>{
    fetch("http://localhost:3030/players")
    .then(response => response.json())
    .then(data => {
      setPlayers(data)
    })
    .catch(error => console.log(error));
  };

  const fetchGuilds = () =>{
    fetch("http://localhost:3030/guilds")
    .then(response => response.json())
    .then(data => {
      setGuilds(data)
    })
    .catch(error => console.log(error));
  };

  const fetchSegments = () =>{
    fetch("http://localhost:3030/segments")
    .then(response => response.json())
    .then(data => {
      setSegments(data)
    })
    .catch(error => console.log(error));
  };

  const fetchOffers = () =>{
    fetch("http://localhost:3030/offers")
    .then(response => response.json())
    .then(data => {
      setOffers(data)
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchPlayers();
    fetchGuilds();
    fetchSegments();
    fetchOffers();
  },[])

  return (
    <div>
      <Row>
        <DashboardCard amount={players.length} name='Players'/>
        <DashboardCard amount={guilds.length} name='Guilds'/>
        <DashboardCard amount={segments.length} name='Segments'/>
        <DashboardCard amount={offers.length} name='Offers'/>
      </Row>
      <Players players={players} segments={segments} offers={offers} guilds={guilds}/>
    </div>
  );
}