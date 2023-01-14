import React from 'react'
import styled from 'styled-components'
import { JsxElement } from 'typescript'
import { BASE_IMAGE_URL } from '../../data/data'

type Props = {
    children: String,
    active?: boolean,
    added?:number,
    onClick?: () => void,
    render?: () => React.ReactElement,
    url?: string
}

const Item  = styled.div`
    cursor: pointer;
    position: relative;
    width: 215px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;
    padding: 0 10px;
    margin-bottom: 1rem;

`

const ImageWrapper = styled.div`
    height: 216px;
    border-radius: 10px;
    margin-bottom: 10px;

    img{
    border-radius: 10px;

        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ListName = styled.h3`
    text-align: center;
    
    svg{
        fill: green;
        width: 20px;
        height: 20px;
        position: relative;
        top: 2px;
        left: 8px;
    }
`

const AddInformation  = styled.div`
    position: absolute;
    top: 0;
    padding: 13px 5px;
    right: 0;
    color: #e6e6e6;
    background: #C83A3A;
    border-radius: 20px;
    
`

const SelectListELem = ({children,active=false,added, onClick, render, url="sault.jpg"}: Props) => {
  return (
    <Item onClick={onClick}>
        <ImageWrapper>
            <img src={`${BASE_IMAGE_URL}/${url}`} alt="" />
        </ImageWrapper>
        <ListName>
            {children} 
            {active && <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>}
        </ListName>
        {added &&    <AddInformation>
            {added}р 
        </AddInformation>}
         
        {render && render()}
     
 
    </Item>
  )
}

export default SelectListELem