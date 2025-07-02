import { productCardProps } from "@/components/card/card.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FavouriteState {
    items: productCardProps[];
  }
  
  const initialState: FavouriteState = {
    items: [],
  };

const favouriteSlice=createSlice({
    name:"favourites",
    initialState,
    reducers:{
     toggleFavourite:(state,action: PayloadAction<productCardProps>)=>{
        const exists = state.items.find(item => item.id === action.payload.id);
        if(exists){
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
        else {
            state.items.push(action.payload);
          }
     },
     setFavourites: (state, action: PayloadAction<productCardProps[]>) => {
      state.items = action.payload;
    }
    }
})
export const { toggleFavourite,setFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;