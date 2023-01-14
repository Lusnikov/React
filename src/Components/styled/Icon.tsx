import React, { Children } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: inline-block;
    position:relative;
    cursor: pointer;
`
const Badge = styled.div<any>`
    position: absolute;
    right: -6px;
    text-align: center;
    top: -6px;
    display: block;
    width: 22px;
    height: 20px;
    border-radius: 100%;
    background: #EC8F8F;
`

type Props = {
    children: React.ReactElement,
    onClick?: () => void,
    badgeValue?: Number
}

const Icon = (props: Props) => {
  const {
    children, 
    onClick=()=>{console.log('onclick не задан')},
    badgeValue
    } = props
  return (
    <Wrapper 
        onClick={onClick}
    >
        {children}
        {badgeValue && <Badge>{badgeValue}</Badge>}
    </Wrapper>
  )
}

export default Icon