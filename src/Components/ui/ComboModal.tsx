import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BASE_IMAGE_URL } from '../../data/data'
import { RootState, useAppDispatch } from '../../store'
import { ComboElement, StandartElement, ProductVariation } from '../../types/type'
import ComboSelectorItem from './ComboSelectorItem'
import { FirstColumn, List } from './CustomModal'
import Modal from './Modal'
import SelectListELem from './SelectListELem'
import type { Menu , CompoPosition} from '../../types/type'
import { cartAdd } from '../../store/slice/userSlice'

type Props = {
    onClose: () => void,
    elem: ComboElement
}

export const getUrlFromStandartProducts = (menu: Menu[] ) =>{
   let res:{[key: number]: string} = {}
    const filteredMenu = menu.filter(e => {
      if (Array.isArray(e.variations)) return true
    }).map(elem =>{
       const v = elem.variations as ProductVariation[]
       return v.map(e => res[e.id]=elem.url )
    })
    return res
}


type m =  {
  id_productPrice: number;
  productName: string;
  added: number;
}

const updatePositionValue = (index: number, positions:CompoPosition['content'], item: m) =>{
    return positions.map((elem, ind) => index === ind ? item : elem )
}

const ComboModal = ({onClose, elem}: Props) => {
  const productsUrls = useSelector<RootState, {[key: number]: string} >(e => getUrlFromStandartProducts(e.products.products))
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const {variations} = elem
  const [positions, setPositions] = useState(variations.positionArray.map(e => e.content[0])) 

  const dispatch = useAppDispatch()
  const currentSelection = variations.positionArray[activeIndex].content

  const sendedValue = {
    idCombo: elem.idCombo,
    content: positions.map(({id_productPrice}) => ({id_productPrice}))
  }
  return (
    <Tester
      onClose={onClose}
      elem={elem}
      onSumbit={() => {
        dispatch(cartAdd(sendedValue))
        console.log()
        console.log(elem.idCombo)
      }}
      renderContent={() => (
        <FirstColumn>
            <h2>Позиция "{elem.variations.positionArray[activeIndex].positionName}"</h2>
            <List>
                {currentSelection.map(e => (
                    <SelectListELem
                      url={productsUrls[e.id_productPrice]}
                      added={e.added ? e.added : undefined}
                      active={e.id_productPrice === positions[activeIndex].id_productPrice}
                      onClick={() => {
                        if (e.id_productPrice === positions[activeIndex].id_productPrice)  return       
                        setPositions(updatePositionValue(activeIndex, positions, e))
                      }}
                    >
                        {e.productName}
                    </SelectListELem>
                ))}
            </List>
        </FirstColumn>
      )}
      renderScroll={() => (
        <>
          
          {variations.positionArray.map((e, index) => (
              <ComboSelectorItem
                active={index===activeIndex}
                productName={positions[index].productName}
                positionName={e.positionName}
                addedPrice={positions[index].added ?positions[index].added : undefined }
                url={BASE_IMAGE_URL+`/${productsUrls[positions[index].id_productPrice]}`}
                onClick={() => setActiveIndex(index)}     
              />
          ))}
        </>
       
      )}
      title={elem.productName}
      total={positions.reduce((prev,next) => prev + next.added,  variations.defaultPrice)}
    />
  )
}





export default ComboModal



const SelectWrapper = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
`
const SelectContent = styled.div`
    flex: 0 1 68%;
    max-width: 720px;

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

type Props2<T> = {
  onClose: () => void,
  title: string,
  renderScroll:  (e:T) => React.ReactElement,
  renderContent: () => React.ReactElement,
  total: number,
  elem: T,
  onSumbit?: () => void
}

type D<K> = {
  ingidients : K,
  content: {id: ProductVariation['id']}
}

type F = {
  hey: string
}

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


export const Tester = <T extends ComboElement | StandartElement >({onClose, title,renderContent,renderScroll, total, elem, onSumbit }: Props2<T>) => {
  
  return (
    <Modal onClose={onClose}>
        <>
          <SelectWrapper>
            <SelectContent>
              {renderContent()}
            </SelectContent>
            <SelectTotalBlock>
            <ProductTitle>
              {title}
           </ProductTitle>
           <ScrollArea>
                {renderScroll(elem)}
                </ScrollArea>
              <Total>
              
           
                <div className="">
                    Итог: {total}р
                </div>
                <button onClick={async () =>{
                  onSumbit && await onSumbit()

                }}>Текст кнопки</button>
            </Total>
            </SelectTotalBlock>
          </SelectWrapper>
        </>
    </Modal>
  )
}
