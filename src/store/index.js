import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./tasksSlice";
import uiReducer from './uiSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        ui: uiReducer
    }
})

export default store;