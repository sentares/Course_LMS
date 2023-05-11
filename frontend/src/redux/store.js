import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { menuListSlice } from './slices/menuList'
import { newTestSlice } from './slices/newTestSlice'
import { questionSlice } from './slices/question'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		menuList: menuListSlice.reducer,
		newTest: newTestSlice.reducer,
		question: questionSlice.reducer,
	},
})
