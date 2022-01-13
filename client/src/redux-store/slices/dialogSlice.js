import {createSlice} from '@reduxjs/toolkit'

const dialogSlice = createSlice({
	name: 'dialogSlice',
	initialState: {
		dialogShow: false,
		dialogName: ''
	},
	reducers: {
		dialog(state, action) {
			state.dialogShow = action.payload.visible
			state.dialogName = action.payload.name
		}
	}
})

export default dialogSlice.reducer
export const {dialog} = dialogSlice.actions