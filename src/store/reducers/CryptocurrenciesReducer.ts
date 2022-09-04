import { currencyHistoryType, currencyType } from "./../../types/types";

import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCurrencies = createAsyncThunk<
	currencyType[]
>(
	"currencies/fetch",

	async () => {
		const response = await axios.get<AxiosResponse<any>>(
			"https://api.coincap.io/v2/assets"
		);
		return response.data.data;
	}
);

export const fetchCurrencyHistory = createAsyncThunk<
currencyHistoryType[], string
>(
	"currencies/fetchHistory",

	async (id:string) => {
		const response = await axios.get<AxiosResponse<any>>(
			`https://api.coincap.io/v2/assets/${id}/history?interval=d1`
		);
		return response.data.data;
	}
);
const initialState = {
	currencies: [] as currencyType[],
};

const currencySlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		// fill in primary logic here
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
			state.currencies = action.payload;
		});

	},
});

export default currencySlice.reducer;
