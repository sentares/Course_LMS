import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { menuListSlice } from './slices/menuList'
import { newTestSlice } from './slices/newTestSlice'
import { questionSlice } from './slices/question'
import { topicSlice } from './slices/topicSlice'
import { activeTestsSlice } from './slices/activeTestsSlice'
import { testPassingSlice } from './slices/testPassingSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		menuList: menuListSlice.reducer,
		newTest: newTestSlice.reducer,
		question: questionSlice.reducer,
		topic: topicSlice.reducer,
		activeTests: activeTestsSlice.reducer,
		testPassing: testPassingSlice.reducer,
	},
})
