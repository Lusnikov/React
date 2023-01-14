import React, { Children, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, redirect, } from 'react-router-dom'
import { RootState } from '../store'
import { User } from '../types/type'


type Props = {
    children?: JSX.Element
}

const PrivateRouter = ({children}: Props) => {
  const access = localStorage.getItem('access')  
 
  if (!access )  return <Navigate to={'/'} />

  return (
    <>
        {children}
    </>
  )
}

export default PrivateRouter