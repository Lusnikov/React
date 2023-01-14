import React from 'react'
import styled from 'styled-components'

type Props = {
    addedPrice?: number,
    productName: string,
    positionName?:string,
    url: string,
    active?: boolean,
    onClick?: () => void,
    render?: () => React.ReactElement
}

const Wrapper = styled.div<{active: boolean}>`
    padding: 5px 10px;
    background: #E7E7E7;
    cursor: pointer;
    margin-bottom: 1rem;
    border: ${p => p.active ? '1px solid red' : 'initial'};
`

const PositionTitle = styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
`


const Flex = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ImageWrapper = styled.div`
    max-width: 120px;
    height: 90px;
    border-radius: 20px;
    margin-right: 1rem;
    img{
        width: 100%;
        border-radius: inherit;
        height: 100%;
        object-fit: cover;
    }
`

const ProductName = styled.p`
    font-size: 18px;
`

const AddedPrice = styled.p`
    color: #C8C8C8;
    font-size: 18px;
`

const InfoWrapper = styled.div`
    
`


const ComboSelectorItem = (props: Props) => {
  const {
    addedPrice,
    positionName,
    productName,
    render,
    url,
    onClick,
    active=false
  } = props
  return (
    <Wrapper onClick={onClick} active={active}>
        <PositionTitle>
            {positionName}
        </PositionTitle>
        <Flex>
            <ImageWrapper>
                <img src={url} alt="" />
            </ImageWrapper>
            <InfoWrapper>
                <ProductName>
                   {productName}
                </ProductName>
                {addedPrice
                &&  <AddedPrice>
                         +{addedPrice} р
                     </AddedPrice>
                }
            </InfoWrapper>
        </Flex>
        {render && 
            render()
        }
    </Wrapper>
  )
}

export default ComboSelectorItem