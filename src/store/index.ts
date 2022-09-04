import { configureStore } from '@reduxjs/toolkit'
import CryptocurrenciesReducer from './reducers/CryptocurrenciesReducer'
import UserReducer from './reducers/UserReducer'
// ...

export const store = configureStore({
  reducer: {
    cryptocurrencies: CryptocurrenciesReducer,
    user: UserReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch