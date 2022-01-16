import { OverviewCard, SimpleChart } from "./Card";
import { Row } from './StyledComponents';
import { min, max, median, mean } from 'mathjs';


export const Players = ({ players, segments, offers, guilds }) =>{

  const levels = !players ? null : players.map(item => item.level)

  const toplevel = !levels.length
  ? null
  : max(levels)

  const lowlevel = !levels.length
  ? null
  : min(levels)

  const medianlevel = !levels.length
  ? null
  : median(levels)


  const logins = !players ? null : players.map(item => item.totalLogins)

  const maxlogins = !logins.length 
  ? null
  : max(logins)

  const lowlogins = !logins.length
  ? null
  : min(logins);
  
  const medianlogins = !logins.length
    ? null
    : median(logins);

  const spend = !players ? null : players.map(item => item.totalSpend)

  const highestspend = !spend.length
  ? null
  : max(spend)

  const lowestspend = !spend.length
  ? null
  : min(spend)

  const meanspend = !spend.length
  ? null
  : mean(spend).toFixed(2)

  const usersbelowspendaverage = spend.filter(item => item < meanspend)

  const guildmemberscount = guilds.map(item => {
    return {id: item.id, count: item.memberIds.length}
  })  
  // Guilds
  const numMembers = guildmemberscount.map(item => item.count)

  const maxMembers = !numMembers.length ? null : max(numMembers)
  const medianMembers = !numMembers.length ? null : median(numMembers)
  const minMembers = !numMembers.length ? null : min(numMembers)

  console.log( minMembers, medianMembers, maxMembers )
  const numOfEmptyGuilds = guildmemberscount.filter(item => item.count === 0)
  const numOfGuildslessmedian = guildmemberscount.filter(item => item.count <= 3)
  const numOfGuildsgreatermedian = guildmemberscount.filter(item => item.count > 3)

  console.log(numOfGuildslessmedian.length, numOfGuildsgreatermedian.length)
  console.log(numOfGuildslessmedian.length+numOfGuildsgreatermedian.length)


  const segmentStats = segments.flatMap(segment =>{
    let stat = players.filter(player => player.segments.includes(segment.id))
    return {name: segment.id, stats: stat.length}
   })

 
   const offerStats = offers.flatMap(offer =>{
    let stat = players.filter(player => player.purchases.includes(offer.id))
     return {name: offer.id, stats: stat.length}
    })

  return(
    <>
      <Row>
        <OverviewCard name={'Highest Game Level'} amount={toplevel}/>
        <OverviewCard name={'Guilds with membership Above median'} amount={numOfGuildsgreatermedian.length}/>
        <OverviewCard name={'Highest Total Logins'} amount={maxlogins}/>
        <OverviewCard name={'Highest Total Spend'} amount={highestspend}/>
      </Row>
      <Row>
        <OverviewCard name={'Median Game Level'} amount={medianlevel}/>
        <OverviewCard name={'Median Number of members per Guild'} amount={medianMembers}/>
        <OverviewCard name={'Median Total Logins'} amount={medianlogins}/>
        <OverviewCard name={'AVG Total Spend'} amount={meanspend}/>
      </Row>
      <Row>
        <OverviewCard name={'Lowest Level'} amount={lowlevel}/>
        <OverviewCard name={'Guilds with Membership below median'} amount={numOfGuildslessmedian.length}/>
        <OverviewCard name={'Lowest Total Logins'} amount={lowlogins}/>
        <OverviewCard name={'Amount of Users Below AVG Spend'} amount={usersbelowspendaverage.length}/>
      </Row>
      <Row>
        <SimpleChart data={segmentStats}/>
      </Row>
      <Row>
        <SimpleChart data={offerStats}/>
      </Row>
    </>
  )
}