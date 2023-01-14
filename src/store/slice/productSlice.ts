import { createSlice, PayloadAction , createAsyncThunk} from "@reduxjs/toolkit";
import { $api } from "../../api/api";
import type { Menu } from "../../types/type";

type InitialState = {
    products: Menu[]
    isLoading: boolean
}

const initialState: InitialState= {
    products: [],
    isLoading: true
}

export const fetchProducts = createAsyncThunk<Menu[]>(
    'product/fetching',
    async () => {
        const {data} = await $api<Menu[]>('/product/getMenu')
        return data
    }
)

const productSlice = createSlice({
   name:"products" ,
   initialState,
   reducers:{

   },
   extraReducers: (builder) =>{
    builder.addCase(fetchProducts.fulfilled, (state, type) =>{
        const products = state.products
        if (!state.products.length){
            state.products = [...type.payload]
        }
        state.isLoading = false
    })
   }
   
})

export default productSlice.reducer