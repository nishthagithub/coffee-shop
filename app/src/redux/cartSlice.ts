import { CupSize } from "@/components/card/card.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  imageUrl: any;
  title: string;
  price: number;
  selectedSize: CupSize;
  selectedSugar: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((item) => 
        item.id === action.payload.id && 
        item.selectedSize === action.payload.selectedSize && 
        item.selectedSugar === action.payload.selectedSugar
      );
      
      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;