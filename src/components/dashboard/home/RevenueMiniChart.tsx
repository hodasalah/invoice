import {
	Area,
	AreaChart,
	ResponsiveContainer,
} from 'recharts';

const data = [
	{ value: 2000 },
	{ value: 3500 },
	{ value: 5000 },
	{ value: 4500 },
	{ value: 7000 },
	{ value: 9000 },
	{ value: 12000 },
	{ value: 15000 },
	{ value: 18000 },
	{ value: 22000 },
	{ value: 30000 },
	{ value: 43752 },
];

export default function RevenueMiniChart() {
	return (
		<ResponsiveContainer
			width="100%"
			height="100%"
		>
			<AreaChart data={data}>
				<defs>
					<linearGradient
						id="bestClient"
						x1="0"
						y1="0"
						x2="0"
						y2="1"
					>
						<stop
							offset="0%"
							stopColor="#fff"
							stopOpacity={0.5}
						/>

						<stop
							offset="100%"
							stopColor="#fff"
							stopOpacity={0}
						/>
					</linearGradient>
				</defs>

				<Area
					type="monotone"
					dataKey="value"
					stroke="#fff"
					strokeWidth={4}
					fill="url(#bestClient)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}