import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, 
  Cell,
  PieChart, Pie, 
} from "recharts";
import { Card, H1, H3, H2, MiniCard, } from './StyledComponents';


export const DashboardCard = ({ amount, name}) =>{
  return(
    <Card highlight={name}>
      <H1>{amount}</H1>
      <H3>{name}</H3>
    </Card>
  )
}

export const OverviewCard = ({ name, amount }) =>{
  return(
    <MiniCard>
      <H2>{amount}</H2>
      <H3>{name}</H3>
    </MiniCard>
  )
}

export const SimpleChart = ({ data }) => {
  return (
    <BarChart
      style={{margin: 'auto'}}
      width={980}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="stats" fill="#1DA1F2" />
    </BarChart>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const SimplePieChart = ({data}) =>{
  return (
    <PieChart width={900} height={400}>
      <Pie
        data={data}
        cx={220}
        cy={120}
        innerRadius={100}
        outerRadius={120}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="stats"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}