import React, { useState } from 'react'
import styled from 'styled-components'
import { BASE_IMAGE_URL } from '../../data/data'
import { useAppDispatch } from '../../store'
import { fetchProducts } from '../../store/slice/productSlice'
import { cartAdd, } from '../../store/slice/userSlice'
import { Ingridients, ProductVariation, StandartElement } from '../../types/type'
import { Tester } from './ComboModal'
import ComboSelectorItem from './ComboSelectorItem'
import SelectListELem from './SelectListELem'
import VolumePosition from './VolumePosition'
import { v4 as uuidv4 } from 'uuid';


type Props = {
    elem: StandartElement,
    onClose: () => void
}


const PositionsList = styled.div`
    display: flex;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar{
      display: none;
    }
`

export const FirstColumn = styled.div`
    padding: 30px 10px;
    max-height: 100%;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar{
      display: none;
    }
    h2{
        text-align: center;
        margin-bottom: 1rem;
    }
`

export const List = styled.div`
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-around;
`

const getMaxPriceId = (array: ProductVariation[]) =>{
    const res = array.map(e => e.price)
    return res.indexOf(Math.max(...res))
}

const CustomModal = ({elem, onClose}: Props) => {
    const ingridientIfExists = elem.ingridients ? elem.ingridients.filter(e => e.price === 0).map(e=> e.idIngridient) : null
    const [selectedIndex, setSelectedId] = useState<number>(getMaxPriceId(elem.variations as ProductVariation[]))
    const [ingridients, setIngridients] = useState<number[]| null>(ingridientIfExists)
    const [requestStatus, setRequestStatus] = useState<'waiting' | 'sended' | 'success'>('waiting')
    const dispatch = useAppDispatch()
   
    const reducePrice = (prev:number, current:Ingridients) =>{
        if (ingridients?.includes(current.idIngridient))  return prev+current.price
        return prev
    }
    const ingridientsPrice  = elem.ingridients ? elem.ingridients.reduce(reducePrice , 0) : 0
    const selectedProduct = elem.variations[selectedIndex]
    
    const IngridientHandler = (id:number) => {
        if (!ingridients) return
        if (ingridients.indexOf(id)===-1) return setIngridients([...ingridients, id])
        setIngridients(ingridients.filter(e => e !== id))  
    } 
    const returnedValue = {
        ingridients: Array.isArray(ingridients) ? ingridients.length === 0 ? null : ingridients  : null  ,
        content: {id: selectedProduct.id}
    }
    const volumeHandler = (index:number) => () => setSelectedId(index)

    const onSubmit = async () =>  {
        setRequestStatus('sended')
        await dispatch(cartAdd(returnedValue))
        .then(() => {
            onClose()
        })
        .catch(err =>{
            console.warn(err)
        })
    }

  return (
        <Tester 
            elem={elem}
            total={selectedProduct.price + ingridientsPrice}
            onClose={onClose} 
            title='Title' 
            onSumbit={onSubmit}
            renderScroll={(ELEM) => (
                <ComboSelectorItem 
                    addedPrice={ingridientsPrice ? ingridientsPrice : undefined}
                    productName={ `${elem.productName} (${selectedProduct.volume})` }
                    url={`${BASE_IMAGE_URL}/1.jpg`}
                    render={() => (
                        <PositionsList>
                            {ELEM.variations
                            .map(( { volume }, index ) => (
                                <VolumePosition 

                                    onClick={volumeHandler(index)} 
                                    active={index===selectedIndex} 
                                >
                                    { volume }
                                </VolumePosition>
                            ))
                            }
                        </PositionsList>
                    )}
                />
            )
            }
            renderContent={() => (
                <FirstColumn>
                <h2>Описание, статус отправки - {requestStatus}</h2>
                {elem.description}
                <button
                    onClick={() => dispatch(fetchProducts())}
                >
                    fsdffs
                </button>
                {ingridients && 
                    <>
                        <h2>Настройка ингрдиентов</h2>
                        <List >
                            {elem.ingridients.map((ingridient) => {
                                return (
                                    <SelectListELem 
                                        key={uuidv4()}
                                        active={ingridients.includes(ingridient.idIngridient)} 
                                        added={ingridient.price ? ingridient.price  : undefined }
                                        onClick={() => IngridientHandler(ingridient.idIngridient)}
                                    >
                                        {ingridient.name}
                                    </SelectListELem>
                                )
                                }
                            )} 
                        </List>
                    </>
                }
                </FirstColumn>

            )
            }
        />
    )
  
}

export default CustomModal