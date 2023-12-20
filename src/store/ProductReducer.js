import { createSlice } from "@reduxjs/toolkit";

const fetchProduct = async () => {
    var res = await fetch('https://dummyjson.com/products?limit=100')
    res = await res.json()
    res.products.map(item => item.isFav = false)
    return res.products
}

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: await fetchProduct()
    },
    reducers: {
        addToFav: (state, action) => {
            state.products.map(item => {
                if (item.id === action.payload) {
                    item.isFav = true
                }
            })
        },
        removeFromFav: (state, action) => {
            state.products.map(item => {
                if (item.id === action.payload) {
                    item.isFav = false
                }
            })
        }
    }
})

export const { addToFav, removeFromFav } = productsSlice.actions
export default productsSlice.reducer