import axios from "axios";
import { useEffect, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../common/Header/Header";
import { currencyType } from "../../types/types";
import AddCurrencyButton from "../../common/AddCurrencyButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCurrencies } from "../../store/reducers/CryptocurrenciesReducer";

const Table = styled.table`

	font-size: 1.5em;
	font-weight: bold;
	margin: auto;
	table-layout: fixed;
	width: 45vw;
	text-align: center;
	color: #08b745;
	border-collapse: collapse;
	background-color: #f8f8f8;

	td {
		

		padding-left: 5%;
		border-bottom: 2px #a2a2a2 solid;
	}
	th {
		padding: 2%;
		
	}

	thead {
		background-color: #686868;
		color: white;
	}
`;
const Pagination = styled.ul`
	margin-top: 15vh;
	display: flex;
	list-style-type: none;
	justify-content: center;
	li {
		margin: auto 15px;
		cursor: pointer;
	}
`;
const PaginationElement = styled.li<{ chosen: boolean }>`
	background-color: ${(props: any) => (props.chosen ? "#b3b3b3" : "white")};
	color: ${(props: any) => (props.chosen ? "white" : "black")};
	padding: 0.5rem;
	border-radius: 1rem;
`;


function Main() {
	const dispatch = useAppDispatch();

	const currencies = useAppSelector((state) => state.cryptocurrencies.currencies);
	const [currentPage, setCurrentPage] = useState(1);
	const [currenciesPerPage, setCurrenciesPerPage] = useState(10);

	const handlePageChange = (event: MouseEvent<HTMLElement>) => {
		
		setCurrentPage(Number((event.target as Element).id));
	};
	useEffect(() => {
		dispatch(fetchCurrencies())
		
	}, []);
	const indexOfLastCurrencies = currentPage * currenciesPerPage;
	const indexOfFirstCurrencies = indexOfLastCurrencies - currenciesPerPage;
	const currentCurrencies = currencies?.slice(
		indexOfFirstCurrencies,
		indexOfLastCurrencies
	);

	const renderCurrencies = currentCurrencies?.map((currency) => (
		<tr key={currency.id}>
			<td>
				<AddCurrencyButton id={currency.id} name={currency.name}/>
				<Link to={`/currency/${currency.id}`}>
					{currency.name} ({currency.symbol})
				</Link>
			</td>
			<td>
				{Number(currency.priceUsd).toLocaleString(undefined, {
					maximumFractionDigits: 6,
				})}
			</td>
		</tr>
	));

	const pageNumbers = [];
	if (currencies) {
		for (
			let i = 1;
			i <= Math.ceil(currencies.length / currenciesPerPage);
			i++
		) {
			pageNumbers.push(i);
		}
	}
	const renderPageNumbers = pageNumbers.map((number) => {
		return number === currentPage ? (
			<PaginationElement
				chosen={true}
				key={number}
				id={number.toString()}
				onClick={(e) => handlePageChange(e)}
			>
				{number}
			</PaginationElement>
		) : (
			<PaginationElement
				chosen={false}
				key={number}
				id={number.toString()}
				onClick={(e) => handlePageChange(e)}
			>
				{number}
			</PaginationElement>
		);
	});

	return (
		<div>
			<Header />
			<Pagination>{renderPageNumbers}</Pagination>
			<Table>
				<thead>
					<tr>
						<th>Криптовалюты</th>
						<th>Курс</th>
					</tr>
				</thead>
				<tbody>{renderCurrencies}</tbody>
			</Table>
		</div>
	);
}

export default Main;
