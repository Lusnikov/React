import React, { useEffect, useState } from 'react';
import { $api } from './api/api';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import Cart from './Components/Cart';
import Header from './Components/Header/Header';
import { fetchCities } from './store/slice/citiesSlice';
import { AxiosResponse } from 'axios';
import type { SignInResponse } from './types/type';
import { getCart, setUser } from './store/slice/userSlice';
import { Tester } from './Components/ui/ComboModal';
import PrivateRouter from './Components/PrivateRouter';


function App() {
  const dispatch = useAppDispatch()
  // const cart = useSelector<RootState>(p => console.log(p.user?.cart))
  useEffect(() =>{
    $api.post<SignInResponse>('user/refresh')
    .then(e => e.data)
    .then(e =>{
      localStorage.setItem('access', e.accessToken)
      dispatch(setUser(e.user))
    })
    .then(e =>{
      dispatch(getCart())
    })
  }, [])

  return (
    <div className="App">
        
          <Header/>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/cart' element={ <PrivateRouter><Cart/></PrivateRouter>}/>
            <Route path='*' element={<div>Страница не найдена</div>}/>
          </Routes>    

    </div>
  );
}

export default App;
