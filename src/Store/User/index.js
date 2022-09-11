import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    changeUser: (state, payload) => {
      console.log(payload)
      // state.user = payload
    },
  },
})

export const { changeUser } = slice.actions

export default slice.reducer
