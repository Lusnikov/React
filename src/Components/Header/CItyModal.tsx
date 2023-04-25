import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState, useAppDispatch } from '../../store'
import { setCity } from '../../store/slice/citiesSlice'
import Modal from '../ui/Modal'

type Props = {
    onClose: () => void
}

const Wrapper = styled.div`
   padding: 1rem;
   max-height: 100%;
   height: 100%;

  & h2{
    margin-bottom: 10px;
   }
`

const ScrollCity = styled.ul`
   display: flex;
   overflow: auto;
   max-height: 70%;
   flex-wrap: wrap;
   text-align: center;
   margin-top: 1rem;

   & li{
    cursor: pointer;
    list-style-type: none;
    flex: 1 0 33%;
    margin-bottom: 10px;
   }
`

const LiElement = styled.li<{isActive: boolean}>`
   color: ${props => props.isActive ? "red" : "inherit"} ;
`

const CItyModal = ({onClose}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')

  const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
  }

  const cities = useSelector<RootState, RootState['cities']['cities']>(state => state.cities.cities)
  const selectedCity  = useSelector<RootState, RootState['cities']['selectedCity']>(state => state.cities.selectedCity)
  const dispatch = useAppDispatch()
  return (
    <Modal onClose={onClose}>
        <Wrapper>
           <h2>Выберите город из списка</h2>
           <div className="">
              <input 
                type="text" 
                onChange={inputHandler}
              />
           </div>
           <ScrollCity>
            {cities
            .filter(({city}) => city.toLowerCase().includes(inputValue) )
            .map(city => (
                <LiElement 
                  onClick={(e) => dispatch(setCity(city))}
                  isActive={city.cityId===selectedCity?.cityId}
                >
                    {city.city}
                </LiElement>
            ))}
           
           </ScrollCity>
        </Wrapper>
    </Modal>
  )
}

export default CItyModal