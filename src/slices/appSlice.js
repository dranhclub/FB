const { createSlice } = require("@reduxjs/toolkit");

const app = createSlice({
  name: 'app',
  initialState: {
    usePicsumAvatar: false
  },
  reducers: {
    setUsePicsumAvatar: (state, action) => {
      state.usePicsumAvatar = action.payload.usePicsumAvatar;
    }
  }
});

const {reducer, actions} = app;

export const {
  setUsePicsumAvatar
} = actions;

export default reducer;