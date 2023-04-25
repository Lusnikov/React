import { createSlice, PayloadAction , createAsyncThunk} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "../../api/api";

type CityType = {city: string, cityId: number}

type initialType = {
    cities: CityType[] ,
    selectedCity: CityType | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
} 

const initialState:initialType ={
    cities: [],
    selectedCity:  {city: 'Москва', cityId: 1},
    loading: 'idle',
};



export const fetchCities = createAsyncThunk<CityType[] >(
    'fetchCities', 
    async (_, {rejectWithValue}) =>{
        const cities = await (await $api.get<any, AxiosResponse<CityType[]>>('/order/getCities')).data
        return cities

    }
)


export const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers:{
        setCity: (state, payload: PayloadAction<CityType>) =>{
            state.selectedCity = payload.payload
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchCities.fulfilled, (state, action) =>{
           state.cities= action.payload
           state.selectedCity=action.payload[0]
           state.loading="succeeded"
        })
        builder.addCase(fetchCities.pending, (state, action) =>{
            state.loading = 'pending'
        })
        builder.addCase(fetchCities.rejected, (state, action) =>{
            console.log('Возникла непредвиденная ошибка')
            console.log(action.error)
            state.loading = 'failed'
        })
        // builder.addCase()
    }
})



export const { setCity } = citiesSlice.actions
export default citiesSlice.reducer
