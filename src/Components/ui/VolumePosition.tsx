
import React from 'react'
import styled from 'styled-components'

type Props = {
    active?: boolean,
    children: string,
    onClick?: (e: React.MouseEvent) => void
}

type Tdiv = {
    active: boolean
}

const Div = styled.div<Tdiv>`
    cursor: pointer;
    color: white;
    background: ${(props => props.active ? 'red' :  '#7B89BA' )};
    padding:  4px 8px;
    border-radius: 4px;
    margin-right: .5rem;
    border: 1px solid red;
    flex: 0 0 auto;

    &:hover{
      background: blue;
    }
`

const VolumePosition = ({children,active=false, onClick}: Props) => {
  return (
    <Div active={active} onClick={onClick ? onClick : undefined}>
        {children}
    </Div>
  )
}

export default VolumePosition