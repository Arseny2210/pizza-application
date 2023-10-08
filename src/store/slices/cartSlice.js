import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
    total: 0,
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addItem(state, action) {
            const id = action.payload;
            const ind = state.items.findIndex(item => item.id == id);
            if (ind == -1) { 
                const item = {id, qty: 1}
                state.items.push(item)
            } else {
                state.items[ind].qty += 1;
            }

            state.count = state.items.reduce((count, item ) => count + item.qty, 0)

            // state.total = 

        },
        deleteItem (state,action) {

        }
    }
})

export const {addItem, deleteItem} = cartSlice.actions;
export default cartSlice.reducer;