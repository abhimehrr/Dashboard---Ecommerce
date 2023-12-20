import { configureStore } from '@reduxjs/toolkit'

// Reducers
import ProductReducer from './ProductReducer'


export default configureStore({
    reducer : {
        products : ProductReducer
    }
})