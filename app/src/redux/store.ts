import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer  from './favouriteSlice';
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
export const store=configureStore({
    reducer:{
        favourites:favouriteReducer,
        cart:cartReducer,
        user:userReducer

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;