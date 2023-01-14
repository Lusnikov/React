import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useOutside } from '../../hooks/useOutside'
import Container from '../styled/Container'
import Icon from '../styled/Icon'
import CloseIcon from './CloseIcon'
import NotificationItem from './NotificationItem'

type ModalContentT =  {
    width?: number,
    height?: number
}

const ModalWindow = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    left: 0;
    background: rgba(0,0,0, .5);
    /* color: red; */
`

const ModalContent = styled.div<ModalContentT>`
    display: block;
    width: ${props => props.width ? `${props.width}px` : '100%'};
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)  ;
    max-width: 1068px;
    
    border: 1px solid red;
    /* margin: 0 auto; */
    /* margin-top: 28px; */
    height: ${props => props.height ? `${props.height}px` : '720px'};
    min-height: 300px;
    max-height: calc(100vh - 5vh);
    background: white;

    @media screen and (max-width: 520px) {
        
        
    }
`

const CloseIconStyled = styled.div`
    position: absolute;
    z-index: 10000;
    display: inline-block;
    top: 10px;
    right: 20px;
    
`

type Props = {
    onClose: () => void,
    children: React.ReactElement,
    width?: number,
    height?: number
}



const Modal = ({onClose, children, width, height}: Props) => {
  const contentWindowRef = useRef<HTMLDivElement>(null);
  useOutside(contentWindowRef, onClose)

  useEffect(() =>{
    document.body.style.overflow = 'hidden'
    return () =>{
        document.body.style.overflow = 'inherit'
    }
  })
 

  return (
    <ModalWindow>
        <Container>
            <ModalContent ref={contentWindowRef} width={width} height={height}>
                <>
                <CloseIconStyled onClick={onClose}>
                    <Icon>
                        <CloseIcon/>
                    </Icon>
                </CloseIconStyled>
                {children}
                </>
               
            </ModalContent>
        </Container>
      
     
    </ModalWindow>
  )
}

export default Modal