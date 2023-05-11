import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	questionInfo: '',
}

export const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		setQuestionInfo: (state, action) => {
			state.questionInfo = action.payload
		},
	},
})

export const { setQuestionInfo } = questionSlice.actions
export default questionSlice.reducer
