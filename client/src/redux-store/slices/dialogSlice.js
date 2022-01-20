import {createSlice} from '@reduxjs/toolkit'

const dialogSlice = createSlice({
	name: 'dialogSlice',
	initialState: {
		dialogShow: false,
		dialogName: '',
		dialogData : ''
	},
	reducers: {
		dialog(state, action) {
			state.dialogShow = action.payload.visible
			state.dialogName = action.payload.name
			state.dialogData = action.payload.data
		}
	}
})

export default dialogSlice.reducer
export const {dialog} = dialogSlice.actions