import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    status: null, 
    error: null,
}

// export const fetchPizzas = createAsyncThunk(
//     'pizzas/fetchPizzas', 
//     async (_, {rejectWithValue})=> {
//       try { 
//         const resp = await fetch(`https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items`);
//         if (!resp.ok) {
//             throw new Error('Данные не пришли');
//         }
//         const data = await resp.json();
//        return data;
//     } catch (error) {
//     // return 'Данные не пришли'
//     return rejectWithValue('Данные не пришли')
//     }
// })

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas', 
    async (_, {rejectWithValue, getState})=> {
        const activeCategory = getState(). filter.category;
        const {isUp, type} = getState().filter.sort;
        const search = getState().filter.search
        const category = activeCategory == 0 ? '' : activeCategory;
        const sort = ['rating', 'price', 'title'];
        const order = isUp ? 'asc' : 'desc';
      try { 
        const resp = Promise.all([
            fetch(
                `https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?category=${category}&sortBy=${sort[type]}&order=${order}`
            ),
            fetch(
                `https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?search=${search}`
            ),
            ])
            .then(([sorted, searched]) => { 
            return Promise.all([sorted.json(),searched.json()])
            })
            .then(([sorted,searched])=>{
                const newData = sorted.filter(sortedItem => searched.some(searchedItem => sortedItem.id == searchedItem.id));
                return newData
            // dispatch(setPizzas(newData))
            })
            // .finally(()=> setLoading(false))
        const data = await resp;
       return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const pizzasSlice = createSlice ({
    name: "pizzas",
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading';
            state.error = null;

        })
        .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.items = action.payload
        })
        .addCase(fetchPizzas.rejected, (state, action) => {
            state.status = 'rejected'; 
            state.error = action.payload;
        })
    }
})
export const {setPizzas} = pizzasSlice.actions;
export default pizzasSlice.reducer;