import { configureStore } from "@reduxjs/toolkit"
import homeSlice from "../slice/homeSlice.js"


const store = configureStore({
    reducer: {
        home : homeSlice,
    },
})

export default store;