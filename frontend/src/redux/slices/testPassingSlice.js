import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	infoAboutTestPassing: null,
	questionsOfTest: null,
}

export const testPassingSlice = createSlice({
	name: 'testPassing',
	initialState,
	reducers: {
		setInfoAboutTestPassing: (state, action) => {
			state.infoAboutTestPassing = action.payload
		},
		setQuestionsOfTest: (state, action) => {
			state.questionsOfTest = action.payload
		},
	},
})

export const { setInfoAboutTestPassing, setQuestionsOfTest } =
	testPassingSlice.actions

export default testPassingSlice.reducer
