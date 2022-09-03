import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { currencyType } from "../../types/types";

const HeaderWrapper = styled.div`
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
    z-index:60;
	height: 5vw;
    color: white;
    padding:5px;
background-color:#4a4a4a;
	ul {
    
		display: flex;
		list-style-type: none;
		justify-content: flex-end;
		margin: 1rem;
		li {
			margin: 15px;
		}
	}
`;

function Header() {
	const [popularCurrencies, setPopularCurrencies] = useState<
		Array<currencyType> | undefined
	>(undefined);
	useEffect(() => {
		const fetchCurrencies = async () => {
			const data = await axios.get("https://api.coincap.io/v2/assets");
			const popular = data.data.data.slice(0, 3);
			setPopularCurrencies(popular);
		};
		fetchCurrencies();
	}, []);

	return (
		<HeaderWrapper>
			<ul>
				{popularCurrencies?.map((currency) => (
					<li key={currency.id}>{currency.symbol} ({Number(currency.priceUsd).toFixed(2)}) </li>
				))}
			</ul>
		</HeaderWrapper>
	);
}

export default Header;
