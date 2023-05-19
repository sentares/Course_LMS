import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	activeTestsCount: 0,
}

export const activeTestsSlice = createSlice({
	name: 'activeTests',
	initialState,
	reducers: {
		setActiveTestsCount: (state, action) => {
			state.activeTestsCount = action.payload
		},
	},
})

export const { setActiveTestsCount } = activeTestsSlice.actions
export default activeTestsSlice.reducer
