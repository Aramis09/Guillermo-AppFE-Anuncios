import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  categorySelected: string[]
}

const initialState: State = {
  categorySelected: []

};

export const postSlice = createSlice({
  name: 'TokenReducer',
  initialState,
  reducers: {
    setCategorySelected: (state, action: PayloadAction<string[]>) => { //!actions to change global state, we can use this on buttons or anything 
      state.categorySelected = [...action.payload]
    },

  }
});


export const { setCategorySelected } = postSlice.actions //!Actions change our global state

const reducer = postSlice.reducer //! Reducer is action manager  

export default reducer;