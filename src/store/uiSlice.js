import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        id: null,
        shown: false,
        title: null,
        description: null,
        color: null,
        conf: false,
        confTitle: null
    },
    reducers: {
        closeModal(state) {
            state.shown = false
        },
        openModal(state, action) {
            state.shown = true
            const {title, description, color, id} = action.payload
            state.id = id
            state.title = title
            state.description = description
            state.color = color
        },
        askConfirmation(state, action) {
            state.conf = true
            state.confTitle = action.payload
        },
        closeConfirmation(state) {
            state.conf = false
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer