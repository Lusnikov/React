import React, { useState } from 'react'
import styled from 'styled-components'
import { BASE_URL } from '../../api/api'
import type { ComboElement,StandartElement, ComboVariation, ProductVariation } from '../../types/type'
import ComboModal, { Tester } from '../ui/ComboModal'
import ComboSelectorItem from '../ui/ComboSelectorItem'
import CustomModal from '../ui/CustomModal'
import CustomProductModal from '../ui/CustomProductModal'
import VolumePosition from '../ui/VolumePosition'


type itemType =  {
    productType: 'combo' ,
    elem: ComboElement
} |  {
    productType: 'default' | 'custom' ,
    elem: StandartElement
}
type Props = itemType & {
    active?: boolean,
    onClick?: () => void
}

const ProductItemWrapper = styled.div`
    background: #ececec;
    max-width: 400px;
    width: calc(1/3*100% - 78px );
    padding: 1.5rem 3rem;
    margin: 0 39px 4rem 39px;
    border-radius: 20px;

    @media (max-width: 1340px) {
        padding: 1.5rem 1.5rem;
    }
    @media (max-width: 1078px) {
        width: calc(1/3*100% - 50px );
        padding: 1.5rem .25rem;
        margin: 0 25px 2rem 25px;

    }
    @media (max-width: 968px) {
        max-width: initial;
        width: calc(1/2*100% - 50px );
        margin: 0 25px 2rem 25px;
        padding: 1.5rem 1.5rem;
    }
    @media (max-width: 800px) {
        width: calc(100% );
        max-width: 400px;
        margin: 0 0 2rem 0;
    }
`
const ProductImageWrap = styled.div`
    max-width: 100%;
    height: 190px;
    margin-bottom: 22px;
    @media (max-width: 968px) {
        height: 250px;
    }
    & img{
        width: 100%;
        object-fit: cover;
        height: 100%;
        border-radius: 20px;
    }
`

const ProductTitle = styled.h2`
    font-size: 20px;
    margin-bottom: .5rem;
    font-weight: normal;
    text-align: center;
`

const ProductPrice = styled.p`
    text-align: center;
    margin-bottom: 1rem;
`

const ProductButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    button{
        padding: 8px 34px;
        background: #C3C9DF;
        font-size: 18px;
    }
`


const ProductItem = (props: Props) => {
    const {
        elem,
        productType,
        active=false,
        onClick
    } = props

    

    const [modalOpened, setModalOpened] = useState<boolean>(false)

    let res = '';
    if (productType==='combo') res += `от ${elem.variations.defaultPrice} р`
    else if (productType==='custom') res+=`от ${ Math.min.apply(Math, elem.variations.map( e=> e.price))} р` 
    else  res += `${elem.variations[0].price} р`

    const getHandler = (value:"combo" | "default" | "custom") =>({
        'combo': () => {
            setModalOpened(true)
            onClick && onClick()
        },
        'default': () =>{
            alert('Добавить')
            onClick && onClick()
    },
        'custom': () =>{
            setModalOpened(true)
            onClick && onClick()
        }
    }[value])

    const handler = getHandler(productType)

  const [imageLoaded, setImageLoaded] = useState<boolean>(false)


    //

  return (
    <ProductItemWrapper>
        <ProductImageWrap>
            <img 
                style={imageLoaded ? undefined : {display: 'none'}}
                src={`${BASE_URL}/image/${elem.url}`} 
                alt=""  
                onLoad={() => {
                    console.warn('Загрузились')
                    setImageLoaded(true)}
                }
            />
        </ProductImageWrap>
        <ProductTitle>
            {elem.productName}
        </ProductTitle>
        <ProductPrice>
           {res}
        </ProductPrice>
        <ProductButtonWrapper>
            <button
                onClick={handler}
            >
                Выбрать
            </button>
        </ProductButtonWrapper>

        {modalOpened && productType==='combo' && 
            <ComboModal 
                elem={elem}
                onClose={() => setModalOpened(false)}
            />
        }


        {modalOpened && productType==='custom' && 
            <CustomModal elem={elem}  onClose={() => setModalOpened(false)} />
            // <CustomProductModal 
            //     onClose={() => setModalOpened(false)}
            //     product={elem}
            // />
        }
   
    </ProductItemWrapper>
  )
}

export default ProductItem