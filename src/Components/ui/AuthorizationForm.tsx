import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { $api } from '../../api/api'
import Input from '../styled/Input'
import Modal from './Modal'
import SignInModal from './SignInModal'
import type { TsendInfo } from '../../types/type'
import { AxiosError, AxiosResponse } from 'axios'
import { useAppDispatch } from '../../store'
import { setUser } from '../../store/slice/userSlice'
import type { SignInResponse } from '../../types/type'
type Props = {
    onClose: () => void
}

type FormsTypes = 'sign-in' | 'registration'




const SignInApi = async  (sendedData:TsendInfo, onError:(message:string) => void) =>{
    try{
        const {data} = await $api.post<unknown, AxiosResponse<SignInResponse>>('/user/signIn', sendedData)
        localStorage.setItem('access', data.accessToken)
        return data.user

    } catch(err){
        if (err instanceof AxiosError){
          const errMessage = err.response?.data as string
          onError('123')
        }
        else if (err instanceof Error){
            onError(err.message)
        }
    }
}


const AuthorizationForm = ({onClose}: Props) => {
  const [formType, setFormType] = useState<FormsTypes>('sign-in')
   const dispatch =  useAppDispatch()
  return (
    <>
        {formType==='sign-in' && 
            <SignInModal 
                onClose={onClose} 
                callback={async (e, setter) => {
                    const user = await SignInApi(e, (message) => setter(message))
                    if (user){
                        dispatch(setUser(user))
                        onClose()
                    }        
                }
                }
            />
        }

         {formType==='registration' && 
            <Modal  onClose={onClose}   >
                <>
                Форма Регистрации
                </>
            </Modal>
        }
    </>
  )
}

export default AuthorizationForm