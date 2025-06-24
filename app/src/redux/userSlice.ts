import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../auth/supabaseAuth";
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const user = await getCurrentUser();
    return {
      username: user?.user_metadata?.username || user?.email || 'User',
      email: user?.email || '',
      id: user?.id || '',
    };
  });

const userSlice = createSlice({
  name:"user",
  initialState: {
    username: '',
    email: '',
    id: '',
    loading: false,
  },
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUserData.pending,(state)=>{
        state.loading=true
    })
    .addCase(fetchUserData.fulfilled,(state,action)=>{
        state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.loading = false;
      })
      .addCase(fetchUserData.rejected,(state)=>{
        state.loading=false
      })
  }
})
export default userSlice.reducer;