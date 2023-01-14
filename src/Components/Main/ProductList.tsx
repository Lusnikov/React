import React, { useState } from 'react'
import styled from 'styled-components'
import { ComboElement, Menu , StandartElement} from '../../types/type'
import ProductItem from './ProductItem'
import { v4 as uuidv4 } from 'uuid';

type Props = {
    products: Menu[]
}

const ProductsListDIV =  styled.div`
    width: calc(100% + 78px);
    flex-wrap: wrap;
    display: flex;
    margin: 0 -39px;
    padding:0  .5rem;

    @media (max-width: 1078px) {
        width: calc(100% + 50px);
        /* padding: 1.5rem .25rem; */
        margin: 0 -25px;

    }
    @media (max-width: 968px) {
        width: calc(100% + 50px);
        /* padding: 1.5rem .25rem; */
        margin: 0 -25px 2rem -25px;
    }
   
      @media (max-width: 800px) {
        width: 100%;
        margin: 0 -0 2rem 0;
        justify-content: center
      }
  
`

type IsTest ='combo' | 'default' | 'custom'

const isCustom = (elem:Menu) => {
    if (Array.isArray(elem.variations)){
        if (elem.ingridients || elem.variations.length > 1 ){
            return true
        }
    }
    return false
} 
const getProductStatus = (elem: Menu):IsTest => {
    if (elem.idCombo) return 'combo'
    if (isCustom(elem)) return 'custom'
    return 'default'
}

type t2<T> ={
    elem: T,
    index: number
}



const ProductList = ({products}: Props) => {
   const renderProduct = <T extends Menu>(value:IsTest) =>({ 
        combo: (props: t2<T>,) => (
            <ProductItem
                active={true}
                productType='combo' 
                elem={props.elem as ComboElement}
            />
        ),
        default:  (props: t2<T>,) => (
            <ProductItem 
                productType='default' 
                elem={props.elem as StandartElement}
            />
        ),
        custom:  (props: t2<T>,) => (
            <ProductItem 
                productType='custom' 
                elem={props.elem as StandartElement}
            />
        ),
   }[value])
  
    const Handler = (e:{elem: Menu, index: number}) => {
        const V =  renderProduct(getProductStatus(e.elem)).bind(null, {
            elem: e.elem,
            index: e.index
        })
        return V()
    }
    return (
        <ProductsListDIV>
            {products.map((e, index) => <Handler  index={index} key={uuidv4()} elem={e}  />)}
        </ProductsListDIV>
    )
}

export default ProductList