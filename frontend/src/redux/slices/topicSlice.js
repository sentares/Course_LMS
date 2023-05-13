import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	regulateCountOfQuestionInTopic: 0,
}

export const topicSlice = createSlice({
	name: 'topic',
	initialState,
	reducers: {
		setRegulateCountOfQuestionInTopic: (state, action) => {
			state.regulateCountOfQuestionInTopic = action.payload
		},
	},
})

export const { setRegulateCountOfQuestionInTopic } = topicSlice.actions
export default topicSlice.reducer
