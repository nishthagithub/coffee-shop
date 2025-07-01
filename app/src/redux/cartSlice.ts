import { CupSize } from "@/components/card/card.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemRedux {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  selectedSize: CupSize;
  selectedSugar: string;
  quantity: number;
  hasSugar: boolean;
}

interface CartState {
  items: CartItemRedux[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemRedux>) => {
      const exists = state.items.find((item) => 
        item.id === action.payload.id && 
        item.selectedSize === action.payload.selectedSize && 
        item.selectedSugar === action.payload.selectedSugar&&
        item.imageUrl === action.payload.imageUrl
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
    increment:(state,action:PayloadAction<{id:string,selectedSugar: string,selectedSize:CupSize}>)=>{
      console.log("increment payload",action.payload)
      const item = state.items.find((item) => 
        item.id === action.payload.id &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedSugar === action.payload.selectedSugar
      );
      if(item){
        item.quantity += 1;
      }
    },
    decrement:(state,action:PayloadAction<{id:string,selectedSugar: string,selectedSize:CupSize}>)=>{
      const item = state.items.find((item) => 
        item.id === action.payload.id &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedSugar === action.payload.selectedSugar
      );
      if(item){
        if(item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => 
            !(i.id === item.id && 
              i.selectedSize === item.selectedSize && 
              i.selectedSugar === item.selectedSugar)
          );
        }
      }
    },
    setCart: (state, action: PayloadAction<CartItemRedux[]>) => {
      state.items = action.payload;
    },
    clearCart:(state)=>{
     state.items=[];
    }
  }
});

export const { addToCart, removeFromCart, increment, decrement, clearCart,setCart } = cartSlice.actions;

// Selector to get total number of items
export const selectCartItemsCount = (state: { cart: CartState }) => state.cart.items.length;

export default cartSlice.reducer;