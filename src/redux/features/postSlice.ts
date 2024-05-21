import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  categorySelected: boolean
}

const initialState: State = {
  categorySelected: false
};

export const postSlice = createSlice({
  name: 'TokenReducer',
  initialState,
  reducers: {
    setCategorySelected: (state, action: PayloadAction<boolean>) => { //!actions to change global state, we can use this on buttons or anything 
      state.categorySelected = action.payload
    },

  }
});


export const { setCategorySelected } = postSlice.actions //!Actions change our global state

const reducer = postSlice.reducer //! Reducer is action manager  

export default reducer;