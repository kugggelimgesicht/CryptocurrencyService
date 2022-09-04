import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../'


type userCurrencyType = {
    id: string
    name: string
    amount: number
}

interface UserState {
  wallet: userCurrencyType[]
}


const initialState: UserState = {
  wallet: [] 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addCurrency: (state, action: PayloadAction<userCurrencyType>) => {
        const existingCurrency = state.wallet.find(currency=>currency.id === action.payload.id);
        existingCurrency?
       existingCurrency.amount += action.payload.amount : 
           state.wallet.push(action.payload)
    },

    removeCurrency: (state, action: PayloadAction<userCurrencyType>) => {
      state.wallet.filter(currency => currency.id === action.payload.id)
    }
  }
})

export const { addCurrency, removeCurrency } = userSlice.actions

export default userSlice.reducer