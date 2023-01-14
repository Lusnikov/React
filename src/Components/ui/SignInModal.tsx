import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Input from '../styled/Input'
import Modal from './Modal'
import type { TsendInfo } from '../../types/type'

const FormTitle = styled.h2`
    text-align: center;
    font-weight: bold;
    margin-bottom: 1rem;
`

const FormContent = styled.div`
  
    display: flex;
    flex-direction: column;
    border: 1px solid red;
  
`

const InputControl = styled.div`
    margin-bottom: 1rem;
`


const FormError = styled.div`
    width: 100%;
    background:#F9E958;
    border-radius: 10px;
    padding: 1rem .5rem;
    margin-bottom: 1rem;
`

const ButtonsBlock = styled.div`
    display: flex;
    align-items: center;
    position: relative;
   
    justify-content: center;

`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
    height: 100%;
    justify-content: space-between;
    padding: 30px 0;
`


const StyleBtn = styled.button`
    padding: .5rem 2rem;
    background: #d0d0d0;
    &:not(:last-child){
        margin-right: 2rem;
    }
`


const IndBtn = styled(StyleBtn)`
     &:hover{
        background: #afaaf6;
     }
`

const ErrorMessage = styled.div`
    margin-bottom: .25rem;
    font-size: .8rem;
    color: red;
`

type Props = {
    onClose: () => void,
    callback: (e:TsendInfo, setError: (err:string) => void) => void
}



const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const InputErrorStyles = {
    border: "1px solid red"
}

const SignInModal = ({onClose, callback}: Props) => {
  const [error, setError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const pswdRef =  useRef() as React.MutableRefObject<HTMLInputElement>;

  const resetErrors = () =>{
    setEmailError('')
    setPasswordError('')
  }

  const setMainError = (err:string) =>{
     setError(err)
  }

  const validateFields = ({email, password}:TsendInfo) =>{
    resetErrors()
        let validateStatus = true;
        if (validateEmail(email) === null) {
            setEmailError('Некорректный формат email')
            validateStatus=false
        }
        if (password.length < 5 || password.length > 30){
             setPasswordError('Пароль должен быть в пределах от 5 символов до 30 включительно')
             validateStatus=false
             return false
        }
       
        return validateStatus
  }

  const sendForm = (callback: (value: TsendInfo, setError: (err:string) => void) => void) =>{
        const password = pswdRef.current.value
        const email = emailRef.current.value
        const formValue = {password, email};
        validateFields(formValue) &&  callback &&  callback(formValue, setMainError)
  }


  return (
    <Modal  onClose={onClose}  width={600} height={500}>
        <ModalContent>
        <FormTitle > 
            Форма входа
        </FormTitle>
        {error && 
            <FormError>
                {error}
            </FormError> 
        }
        <InputControl>
            {emailError && <ErrorMessage data-testid='email-error'>{emailError}</ErrorMessage>}
            <Input ref={emailRef} label='Email' name='1' data-testid="inputEmail" style={ emailError ? InputErrorStyles : undefined } />
        </InputControl>
        <InputControl style={{flex: "1 0 auto"}}>
            {passwordError && <ErrorMessage  data-testid='password-error'>{passwordError}</ErrorMessage>}
            <Input  ref={pswdRef} label='Пароль' type={'password'} data-testid="inputPassword" name='1' style={ passwordError ? InputErrorStyles : undefined }/>
        </InputControl>
        <ButtonsBlock>
            <IndBtn
                onClick={e=> sendForm(callback)}
                data-testid="sign-in-btn"
            >
                Войти
            </IndBtn>
            <StyleBtn data-testid='toRegistration'>
                К регистрации
            </StyleBtn>
        </ButtonsBlock>
        </ModalContent>
    </Modal>
  )
}

export default SignInModal
