import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store'
import { fetchProducts } from '../store/slice/productSlice'
import type { Menu } from '../types/type'
import ProductList from './Main/ProductList'
import Container from './styled/Container'
type Props = {}


const MainPage = (props: Props) => {
  const products = useSelector<RootState, Menu[]>(state => state.products.products)
  const isLoading = useSelector<RootState, boolean>(state => state.products.isLoading)
  const dispatch = useAppDispatch()
  
  useEffect(() =>{
    if (!products.length){
      dispatch(fetchProducts())
    }
  }, [])

  return (
    <Container>
        <>
        {isLoading && <div>Загрузка продуктов</div>}
        <ProductList products={products}/>
        </>
    </Container>
  )
}

export default MainPage