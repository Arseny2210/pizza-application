import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 0,
    sort: {type: 0, isUp: true},
    search: ''
}

const filterSlice = createSlice ({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action) {
            console.log(action)
            state.category = action.payload;
        }, 
        setSort(state, action) {
            state.sort = action.payload;
        }
    }
})

export const {setCategory, setSort} = filterSlice.actions;
export default filterSlice.reducer;