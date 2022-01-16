import { useEffect } from "react";

export const Search = () =>{

  const fetchGuildMembers = (guild) =>{
    fetch(`http://localhost:3030/guildMembers/?guild=${guild}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
  };

  const fetchPlayerSegments = (segment) =>{
    fetch(`http://localhost:3030/playerSegments/?segment=${segment}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
  };

  const fetchPlayerPurchases = (offer) =>{
    fetch(`http://localhost:3030/playerPurchases/?offer=${offer}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchGuildMembers('f424af8a-1aee-4ff7-a83c-e08292a01f33');
    fetchPlayerSegments('HighGold');
    fetchPlayerPurchases('SmallGemPack')
  },[])
  
  return(
    <div>

    </div>
  )

}