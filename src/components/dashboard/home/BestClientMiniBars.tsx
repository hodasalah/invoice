import {
  Bar,
  BarChart,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { value: 8 },
  { value: 12 },
  { value: 15 },
  { value: 18 },
  { value: 22 },
  { value: 26 },
  { value: 32 },
  { value: 38 },
  { value: 43 },
];

export default function BestClientMiniBars() {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart data={data}>
        <Bar
          dataKey="value"
          fill="rgba(255,255,255,.28)"
          radius={[ 8, 8, 0, 0 ]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}