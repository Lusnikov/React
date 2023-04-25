import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { $api } from '../api/api'
import { RootState, useAppDispatch } from '../store'
import {  Cart as CartType } from '../types/type'
import CartItem from './Cart/CartItem'
import Container from './styled/Container'

type Props = {
}


const Title = styled.h2`
  margin-bottom: 32px;
`

const Flex = styled.div`
    padding: 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
    @media (max-width: 1160px) {
        flex-direction: column-reverse;
        align-items: initial;
        justify-content: center;
        
    } 
`

const CartItemsBlock = styled.div`
  width: 100%;
  @media (max-width: 1160px) {
  }
`

const TotalInfo = styled.div`
    border-radius: 10px;
    max-width: 463px ;
    width: 100%;
    background: #F6F6F6;
    padding: 30px 30px;

   @media (max-width: 1306px) {
      max-width: 400px ;
   }
     @media (max-width: 1160px) {
        margin-bottom: 20px;
        max-width: 600px;
        align-self: center;
    } 

`

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  border-radius: inherit;
  background: #F9E958;
  padding: 16px 24px;
  margin-bottom: 42px;
 svg{
  margin-right: 1rem;
  flex: 0 0 auto;
 }
`

const PromocodeInputWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;

  /* &::after{
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    background: black;
    display: block;
    bottom: 0;
    
  } */
  input{
    min-width: 300px;
    font-size: 18px;
    display: inline-block;
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 10px  32px 10px 18px;
  }

  button{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    border: none;
    font-size: 18px;
    background: transparent;
    color: black;

    &:disabled{
      cursor: not-allowed
    }
  }
`

const FooterTotal = styled.div`
     position: relative;
    padding-top: 30px;
    p{
      text-align: center;
      margin-bottom: 10px;
    }
    .order_link{
      background: #C3C9DF;
      display: inline-block;
      padding: 12px 32px;
      border-radius: 10px;
    }
    &::before{
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    background: black;
    display: block;
    top: 0;
    }
    .link_wrapper{
      text-align: center;
    }
`

type TPromoStatus = 'notExits' | 'exists' | ''

const activatePromo = async (promocode:string) =>{
  try{
      const r = await $api.post(`/cart/promocode/${promocode}`)
      console.log(r.data)
  } catch(err){
      if (err instanceof AxiosError){
        throw Error(err.response?.data?.message)
      }
  }

}

const clearPromo = async () =>{
 await $api.patch(`/cart/promocode/clear`)
  .then(({data}) => {console.log(data)})
  .catch(err =>{
    throw new Error(err?.response?.data?.message)
  })
}

const Cart = (props: Props) => {
  const cart = useSelector<RootState, CartType|undefined>(e => e.user?.cart )
  const [promocode, setPromocode] = useState<string>('')
  const [promocodeInit, setPromoInit] = useState<TPromoStatus>('')
  const [error, setError] = useState<string>('')
  const promoIsExist = promocodeInit === 'exists'
  const promoNotExists = promocodeInit === 'notExits'

  const clearing = async  () =>{
    try{
      setPromoInit('')
      await clearPromo()
      setPromoInit('notExits')
      setPromocode('')
      setError('')
    } catch(err){
      const error = err as any
      const message = error?.message as string|undefined
      setError(message ? message : 'Неизвестная ошибка')
    }
  
  }

  const adding = async () =>{
    try{
      setPromoInit('')
      await activatePromo(promocode === '' ? '-1' : promocode)
      setPromoInit('exists')
      setError('')
    } catch(err){
      const error = err as any
      setError(error?.message)
      setPromoInit('notExits')
    }
  }
  

  const promoHandler = async  (e:React.MouseEvent) =>{
    try{
      return promoIsExist ? await clearing() : await adding()
    } catch(err){
      console.log(err)
    }
    // activatePromo(promocode)
  }
 
  useEffect(() =>{
      $api.post<unknown, AxiosResponse<string>>('/cart/promocode')
      .then(({data}) => {
          if (data===''){
            setPromoInit('notExits')
            return
          }
          setPromocode(data)
          setPromoInit('exists')
          console.warn(data)

      })
      .catch(err => console.warn(err))
  }, [])
  
  return (
    <Container>
      <>
        <Title>Корзина</Title>
        <Flex>
            <CartItemsBlock>
              {cart && 
              cart.map(e => (
                <CartItem item={e}/>
              ))
              }
            </CartItemsBlock>
            <TotalInfo>
                {error &&      <ErrorMessage>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.22167 46.396L30.8003 7.896C31.1107 7.343 31.6963 7 32.3333 7C32.968 7 33.556 7.343 33.864 7.896L55.4427 46.396C55.592 46.6643 55.6667 46.9583 55.6667 47.2523C55.6667 48.1507 54.9457 49 53.912 49H10.7547C9.728 49 9 48.16 9 47.2523C9 46.9583 9.07233 46.6643 9.22167 46.396ZM13.7367 45.5H50.9277L32.331 12.3223L13.7367 45.5ZM32.338 30.3403C31.372 30.3403 30.588 31.1243 30.588 32.0903V40.257C30.588 41.223 31.372 42.007 32.338 42.007C33.304 42.007 34.088 41.223 34.088 40.257V32.0903C34.088 31.1243 33.304 30.3403 32.338 30.3403ZM32.3333 23.3403C33.6213 23.3403 34.6667 24.3857 34.6667 25.6737C34.6667 26.9617 33.6213 28.007 32.3333 28.007C31.0453 28.007 30 26.9617 30 25.6737C30 24.3857 31.0453 23.3403 32.3333 23.3403Z" fill="black"/>
                  </svg>
                  <p>
                    {error}
                  </p>
                </ErrorMessage> }
          
                <PromocodeInputWrapper>
                    <input 
                      type="text" 
                      placeholder='Введите промокод' 
                      value={promocode}
                      onChange={(e) => setPromocode(e.target.value)}
                      disabled={promoIsExist || !promocodeInit}
                    />
                    <button
                      disabled={!promocodeInit}
                      onClick={promoHandler}
                      
                    >
                        {promoIsExist && 'Отменить'}
                        {promoNotExists && 'Активировать'}
                        {!promocodeInit && 'Лоадер'}
                      
                    </button>
                </PromocodeInputWrapper>
                <FooterTotal>
                    <p>Итоговая сумма заказа: </p>
                    <p>3000 рублей</p>
                    <div className="link_wrapper">
                      <Link to="/ordering" className='order_link'>
                        Продолжить оформление
                      </Link>
                    </div>
                    
                </FooterTotal>
            </TotalInfo>
        </Flex>
      </>
    </Container>
  )
}

export default Cart