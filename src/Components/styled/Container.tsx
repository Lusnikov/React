import React from 'react'
import styled from 'styled-components'

type Props = {
    children: React.ReactElement
}

const Cont = styled.div`
overflow: hidden;
    max-width: 1364px;
    margin: 0 auto;
`

const Container = ({children}: Props) => {
  return (
    <Cont>
        {children}
    </Cont>
  )
}

export default Container