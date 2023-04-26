import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { menuListSlice } from './slices/menuList'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		menuList: menuListSlice.reducer,
	},
})
