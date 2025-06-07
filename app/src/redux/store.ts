import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer  from './favouriteSlice';
import cartReducer from "./cartSlice"
export const store=configureStore({
    reducer:{
        favourites:favouriteReducer,
        cart:cartReducer

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;