import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	menuList: [],
}

export const menuListSlice = createSlice({
	name: 'menuList',
	initialState,
	reducers: {
		setMenuList: (state, action) => {
			state.menuList = action.payload
		},
	},
})

export const { setMenuList } = menuListSlice.actions
export default menuListSlice.reducer
