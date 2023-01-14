import React, { InputHTMLAttributes, useLayoutEffect } from 'react'
import styled from 'styled-components'
import type { DetailedHTMLProps , HTMLInputTypeAttribute} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string,
    label: string,
  
}

const InputMain = styled.input`
    width: 100%;
    font-size: 1rem;
    color: black;
    display: inline-block;
    padding: 0.5rem 2rem .5rem .5rem;
    border-radius: 5px;
    border: 1px solid black;
    outline: none;
`

const Input = React.forwardRef(   (props: InputProps, ref: any) => {
  const {
    label,
    name
  } = props

  return (
    <InputMain 
        {...props}  
        name={name} 
        placeholder={label}
        ref={ref} 
    />
  )
})

export default Input