import styled from 'styled-components'

const Card = styled.div`
	display: flex;
	width: 255px;
	height: 215px;
  background: #252B42;
  border-radius: 5px;
  text-align: center;
  border-top: solid 4px;
  border-color: ${props => props.highlight === 'Players' ? `#1DA1F2` : props.highlight === 'Guilds' ? `#1EB589` : props.highlight === 'Segments' ? `#DF4896` : `#C4032B`};
  margin: 2em;
  justify-content: center;
  flex-direction: column;
`
const MiniCard = styled.div`
	display: flex;
	width: 255px;
	height: 125px;
  background: #252B42;
  border-radius: 5px;
  margin: 0.4em 2em;
  padding: 0.1em;
  justify-content: center;
  flex-direction: column;
`

const H3 = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${props => props.green ? `#1EB589` : '#8C98C6'};
`
const H1 = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 56px;
  line-height: 48px;
  text-align: center;
  letter-spacing: -2px;
  color: ${props => props.green ? `#1EB589` : '#FFFFFF'};
`
const H2 = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 2px;
  color: ${props => props.green ? `#1EB589` : '#FFFFFF'};
`
const Text = styled.h5`
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 15px;
  color: ${props => props.green ? `#1EB589` : `#8C98C6`};
`

const Row = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin: 2em;
  justify-content: center;
  flex-direction: ${props => props.hidden ? `column` : `row`};
  @media (max-width: 768px) {
    display: ${props => props.hidden ? `none` : `flex`};
    flex-direction: column;

  }
`

  export {
    Card, MiniCard, H3, H2, H1, Text, Row
  }