import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
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
  
`

const CartItemsBlock = styled.div`
  
`

const TotalInfo = styled.div`
  
`



const Cart = (props: Props) => {
  const cart = useSelector<RootState, CartType|undefined>(e => e.user?.cart )



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
            <TotalInfo />
        </Flex>
      </>
    </Container>
  )
}

export default Cart