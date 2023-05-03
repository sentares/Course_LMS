import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	newTest: { gg: 'gg' },
}

export const newTestSlice = createSlice({
	name: 'newTest',
	initialState,
	reducers: {
		setNewTest: (state, action) => {
			state.newTest = action.payload
		},
	},
})

export const { setNewTest } = newTestSlice.actions
export default newTestSlice.reducer
