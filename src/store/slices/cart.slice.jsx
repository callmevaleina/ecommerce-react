import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setUserCart: (state, action) => {
            const cart = action.payload;
            return cart;
        },
        deleteProduct: (state, action)=>{
            const id = action.payload
            const filteredProducts = state.filter(movie => movie.id !== id)
            return filteredProducts
        },
    }
})

export const getUserCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((res) => dispatch(setUserCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart',
            product,
            getConfig())
        .then(() => dispatch(getUserCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setUserCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => {dispatch(deleteProduct(id))})
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setUserCart, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
