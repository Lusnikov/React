import React from 'react'
import styled from 'styled-components'
import { BASE_IMAGE_URL } from '../../data/data'
import { useAppDispatch } from '../../store'
import { addInCart } from '../../store/slice/userSlice'
import { Cart, ComboCartItem, StandartCartItem } from '../../types/type'
import CloseIcon from '../ui/CloseIcon'

type CartItem = {
    item: StandartCartItem | ComboCartItem
}

const Wrapper = styled.div`

    max-width: 766px;
    background: #F1F1F1;
    display: flex;
    padding: 14px 16px 30px 16px;
    border-radius: 10px;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 40px;
    @media (max-width: 1306px) {
        max-width: 666px
    } 
    @media (max-width: 1160px) {
         max-width: 766px;
    } 
    @media (max-width: 617px) {
       flex-direction: column;
    }
`

const ImageWrapper = styled.div`
    flex: 0 0 212px;
    height: 133px;
    margin-right: 48px;

    @media (max-width: 1306px) {
        flex: 0 0 170px;
        margin-right: 24px;
    }

    @media (max-width: 617px) {
        width: 320px;
        height: 200px;
        flex: 0 0 auto;
        margin-bottom: 16px;
    }
   
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ProductInfo = styled.div`
    flex: 1 0 300px;
    /* width: 280px; */
    margin-right: 30px;

    @media (max-width: 1306px) {
        flex: 1 0 260px;
    } 
    @media (max-width: 795px) {
        margin-right: 10px;
    }
    @media (max-width: 617px) {
       flex-direction: column;
       justify-content: center;
       flex: 1 0 auto;
    }
    & .name{
        font-size: 24px;
        margin-bottom: 14px;
        @media (max-width: 795px) {
            font-size: 18px;
        }
    }

    & .price{
        font-size: 22px;
        @media (max-width: 795px) {
            font-size: 18px;
        }
        @media (max-width: 617px) {
            text-align: center;
            margin-bottom: 20px;
        }
    }


`   

const CountController = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
    @media (max-width: 1306px) {
        margin-right: 20px;
    } 
    .btn{
    
        background: transparent;
        &:disabled{
          cursor: not-allowed;
        }

        svg{
          
        }
    }
`

const Count = styled.h3`
    font-size: 24px;
    margin: 0 18px;

    @media (max-width: 795px) {
        margin: 0 9px;
    }
`

const CartItem = (props: CartItem) => {
  const {
    item
  } = props

  const dispatch = useAppDispatch()
    
  const plusCountHandler = () =>{
    if (item.idCombo === null){
        const [el] = item.idCart
        const returned = {
            cartId: el,
            addedCount: 1
        }
        return dispatch(addInCart(returned))
       
    }

    const  returned = {
        cartId: item.idCart,
        comboCount: item.count,
        addedCount: 1
    }
    dispatch(addInCart(returned))


  } 

  const minusCountHandler = () =>{
    if (item.idCombo === null){
        const [el] = item.idCart
        const returned = {
            cartId: el,
            addedCount: -1
        }
        return dispatch(addInCart(returned))
       
    }

    const  returned = {
        cartId: item.idCart,
        comboCount: item.count,
        addedCount: -1
    }
    dispatch(addInCart(returned))
  } 
  return (
    <Wrapper>
        <ImageWrapper>
            <img src={`${BASE_IMAGE_URL}/${item.url}`} alt="" />
        </ImageWrapper>
        <ProductInfo>
            <p className="name">
                {item.name}
            </p>
            <p className="price">
                {item.count*item.productPrice}р
            </p>
        </ProductInfo>

        <CountController>
            <button 
                className='btn' 
                onClick={minusCountHandler}
                disabled={item.count === 1 ? true : false}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6632 0C18.1008 0 23.3275 5.22667 23.3275 11.6632C23.3275 18.1008 18.1008 23.3275 11.6632 23.3275C5.22667 23.3275 0 18.1008 0 11.6632C0 5.22667 5.22667 0 11.6632 0ZM11.6632 1.75C6.1915 1.75 1.75 6.1915 1.75 11.6632C1.75 17.1348 6.1915 21.5775 11.6632 21.5775C17.1348 21.5775 21.5775 17.1348 21.5775 11.6632C21.5775 6.1915 17.1348 1.75 11.6632 1.75ZM16.625 10.7917H6.70833C6.22533 10.7917 5.83333 11.1837 5.83333 11.6667C5.83333 12.1497 6.22533 12.5417 6.70833 12.5417H16.625C17.108 12.5417 17.5 12.1497 17.5 11.6667C17.5 11.1837 17.108 10.7917 16.625 10.7917Z" fill="black"/>
                </svg>
            </button>

            <Count>
                {item.count}
            </Count>
            
            <button 
                className='btn'
                onClick={plusCountHandler}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6632 0C18.1008 0 23.3275 5.22667 23.3275 11.6643C23.3275 18.1008 18.1008 23.3275 11.6632 23.3275C5.22667 23.3275 0 18.1008 0 11.6643C0 5.22667 5.22667 0 11.6632 0ZM11.6632 1.75C6.1915 1.75 1.75 6.19267 1.75 11.6643C1.75 17.136 6.1915 21.5775 11.6632 21.5775C17.1348 21.5775 21.5775 17.136 21.5775 11.6643C21.5775 6.19267 17.1348 1.75 11.6632 1.75ZM10.7917 10.7917H6.70833C6.22533 10.7917 5.83333 11.1837 5.83333 11.6667C5.83333 12.1497 6.22533 12.5417 6.70833 12.5417H10.7917V16.625C10.7917 17.108 11.1837 17.5 11.6667 17.5C12.1497 17.5 12.5417 17.108 12.5417 16.625V12.5417H16.625C17.108 12.5417 17.5 12.1497 17.5 11.6667C17.5 11.1837 17.108 10.7917 16.625 10.7917H12.5417V6.70833C12.5417 6.22533 12.1497 5.83333 11.6667 5.83333C11.1837 5.83333 10.7917 6.22533 10.7917 6.70833V10.7917Z" fill="black"/>
                </svg>
            </button>
        
        </CountController>
        
    </Wrapper>
  )
}

export default CartItem