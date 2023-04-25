import React from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {
    children: React.ReactElement | string 
}
export const Desktop = ({ children }: Props) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return <>
  {isDesktop && children }</>
}
export const Tablet = ({ children }:Props) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return  <>
  {isTablet && children }</>
}
export const Mobile = ({ children }:Props) => {
  const isMobile = useMediaQuery({ maxWidth: 767,  })
  return <>
   {isMobile && children }
   </>
}
export const Default = ({ children }:Props) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return <>
  {isNotMobile && children }</>
}


