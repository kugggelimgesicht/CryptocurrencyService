import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import styled from "styled-components";
import { currencyType } from "../../types/types";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	LineElement,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler,
} from "chart.js";
ChartJS.register(
	Title,
	Tooltip,
	LineElement,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	Filler
);
type currencyHistoryType = {
	priceUsd: string;
	time: string;
	date: string;
};
const CoinInfo = styled.div`
	width: 100vw;
	height: 100vh;
	text-align: center;
	font-size: 50px;
 
`;

function CurrencyPage() {
	const { id } = useParams();
	const [currency, setCurrency] = useState<currencyType | undefined>(undefined);
	const [currencyHistory, setCurrencyHistory] = useState<
		currencyHistoryType | undefined
	>(undefined);
	const [chartLabels, setChartLabels] = useState<any>("");
	const [chartData, setChartData] = useState<any>("");
	const [data, setData] = useState({
		labels: chartLabels,
		datasets: [
			{
				label: "Изменение цены",
				data: chartData,
				backgroundColor: "lightgreen",
				borderColor: "green",
				tension: 0.4,
				fill: true,
				pointStyle: "rect",
				pointBorderColor: "blue",
				pointBackgroundColor: "#fff",
				showLine: true,
			},
		],
		
	});
	useEffect(() => {
		setData({
			labels: chartLabels,
			datasets: [
				{
					label: "Изменение цены",
					data: chartData,
					backgroundColor: "lightgreen",
					borderColor: "green",
					tension: 0.4,
					fill: true,
					pointStyle: "rect",
					pointBorderColor: "blue",
					pointBackgroundColor: "#fff",
					showLine: true,
				},
			],
		});
	}, [chartData]);
	useEffect(() => {
		const fetchCurrency = async () => {
			const data = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
			const history = await axios.get(
				`https://api.coincap.io/v2/assets/${id}/history?interval=d1`
			);

			setCurrency(data.data.data);
			if (history) {
				const prices = history.data.data.map((crypto: currencyHistoryType) =>
					Number(crypto.priceUsd)
				);
				const dates = history.data.data.map((crypto: currencyHistoryType) =>
					new Date(crypto.date).toLocaleDateString("ru")
				);
				setChartData(prices);
				setChartLabels(dates);
			}
			setCurrencyHistory(history.data.data);
		};
		fetchCurrency();
	}, []);
	return (
		<CoinInfo>
			{currency?.name} ({currency?.symbol})<Line data={data}  options={{
    plugins: {
      legend: {
        display: false,
      },           
    }
  }}></Line>
		</CoinInfo>
	);
}

export default CurrencyPage;
