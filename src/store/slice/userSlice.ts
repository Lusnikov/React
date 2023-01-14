import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "../../api/api";
import { Cart, User } from '../../types/type'


type AddInCart = {
    cartId: number | number[],
    addedCount: number,
    comboCount?: number
}

export const addInCart = createAsyncThunk<Cart, AddInCart>(
    'cart/add-in-cart', 
    async (data) =>{
        const response = await $api.post<Cart>('/cart/add', data)
        return response.data
    }
)

export const getCart = createAsyncThunk(
    'cart/get',
    async () =>{
        const result = await $api.post<Cart>('/cart/get')
        return result.data
    }
)

type addStandartProduct = {
    ingridients: null | number[],
    content: {id: number}
}

type addCombo = {
    idCombo: number,
    content: {id_productPrice: number}[]
}

type ComboAddProduct =  addStandartProduct | addCombo

export const cartAdd = createAsyncThunk<Cart, ComboAddProduct>(
    'cart/add-to-cart',
    async (elem) =>{
        const response = await $api.post<Cart>("/cart/add-to-cart", elem)
        return response.data
    }
)


export type initialStateType = User | null

const initialState: initialStateType  = null as initialStateType

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<User> ) =>{
           return  action.payload
        },
        logout: (state) =>{
            return null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getCart.fulfilled, (state, action) =>{
            if (state){
                state.cart = action.payload
                state.cartStatus='loaded'
            }
            // console.table(action.payload)
        })
        builder.addCase(cartAdd.fulfilled, (state, action) =>{
            if (state){
                state.cart = action.payload
            }
        })
        builder.addCase(addInCart.fulfilled, (state, action) =>{
            if (state){
                state.cart = action.payload
            }
        })
    }

})


export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
