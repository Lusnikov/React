import React, { useState } from 'react'
import styled from 'styled-components'
import { ProductVariation, StandartElement } from '../../types/type'
import ComboSelectorItem from './ComboSelectorItem'
import Modal from './Modal'
import VolumePosition from './VolumePosition'
import { v4 as uuidv4 } from 'uuid';

type Props = {
    onClose: () => void,
    product: StandartElement
}

const SelectWrapper = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
`
const SelectContent = styled.div`
    flex: 0 1 68%;

`

const SelectTotalBlock = styled.div`
  position: relative;
  background:  #D9D9D9;
  padding: 0 .5rem;
  padding-top: 30px;
  flex: 0 1 33%;
  display: flex;
  flex-direction: column;
`

const ProductTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`

const PositionsList = styled.div`
    display: flex;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar{
      display: none;
    }
`

const Total = styled.div`
   width: 100%;
   padding: 20px 0;
   left: 0px;
   position: absolute;
   bottom: 0;
   background: #E7E7E7;
`

const ScrollArea = styled.div`
    overflow: auto;
    padding-bottom: 86px;
`

type leftModalStatusType = 'description' | 'ingridients'

const getMaxPriceId = (array: ProductVariation[]) =>{
   const res = array.map(e => e.price)
   return res.indexOf(Math.max(...res))
    
}


const CustomProductModal = ({onClose, product}: Props) => {
  const [leftModalStatus, setModalStatus] = useState<leftModalStatusType>('description')
  const [selectedIndex, setSelectedId] = useState<number>(getMaxPriceId(product.variations))
  const isDescription = leftModalStatus === 'description'
  const isIngridients = leftModalStatus === 'ingridients'

  const selectedProduct = product.variations[selectedIndex]

  return (
    <Modal onClose={onClose}>
    <SelectWrapper>
        <SelectContent>
            {isDescription && 'Описание товара'}
            {isIngridients && 'Ингридиенты'}
        
        </SelectContent>
        <SelectTotalBlock>
          <ProductTitle>
              {product.productName}
          </ProductTitle>

           <ScrollArea className="">
              <ComboSelectorItem 
                url={'http://localhost:5010/image/1.jpg'}
                productName={'Поставить текущий объем'}
                addedPrice={300}
                render={() => <>
                  <PositionsList>
                      {product.variations
                      .map((e, index) => <VolumePosition key={uuidv4()} onClick={() => setSelectedId(index)} active={index===selectedIndex} >{e.volume}</VolumePosition> )
                      }
                  </PositionsList>

                  {product.ingridients && 
                  <button>
                    Настроить ингриденты
                  </button>
                  }
                </>}
            />
          </ScrollArea>

          <Total>
              <div className="">
                  Итог: { selectedProduct.price}р (без учета стоимости добавочных ингридиентов)
              </div>
              <button>Текст кнопки</button>
          </Total>
        </SelectTotalBlock>
    </SelectWrapper>
    </Modal>
  )
}

export default CustomProductModal