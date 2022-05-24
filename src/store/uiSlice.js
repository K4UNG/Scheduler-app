import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        shown: false,
        title: null,
        description: null,
        color: null
    },
    reducers: {
        closeModal(state) {
            state.shown = false
        },
        openModal(state, action) {
            state.shown = true
            const {title, description, color} = action.payload
            state.title = title
            state.description = description
            state.color = color
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer