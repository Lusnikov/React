import React, { PropsWithChildren, useEffect, useState } from 'react'

type Props = {
    showTo?: number,
    showFrom?: number,
    children: React.ReactNode
}

const Adaptive = (props: Props) => {
  const {showTo=8000,children,showFrom=0} = props
  const [width, setWidth] = useState<number>(window.innerWidth)

  const isShow = width <= showTo  && width >= showFrom

  console.log(isShow+' ширина - '+width)
   
  useEffect(() =>{
    const handler = () =>{
      setWidth(window.innerWidth)
    }
    const listener = window.addEventListener('resize', handler)

    return () =>{
      window.removeEventListener('resize', handler)
    }

  })
  return (
    <>
        {isShow && children}
    </>
  )
}

export default Adaptive