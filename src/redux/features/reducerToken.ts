import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  token: string | null
}

const initialState: State = {
  token: null
};

export const exampleSlice = createSlice({
  name: 'TokenReducer',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => { //!actions to change global state, we can use this on buttons or anything 
      state.token = action.payload
    },
    deleteToken: (state) => { //!actions to change global state, we can use this on buttons or anything  
      state.token = null
    },
  }
});


export const { setToken, deleteToken } = exampleSlice.actions //!Actions change our global state

const reducer = exampleSlice.reducer //! Reducer is action manager  

export default reducer;