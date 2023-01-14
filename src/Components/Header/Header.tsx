import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { initialStateType } from '../../store/slice/userSlice'
import Adaptive from '../Adaptive'
import DesktopHeader from '../styled/DesktopHeader'
import MobileHeader from '../styled/MobileHeader'
import AuthorizationForm from '../ui/AuthorizationForm'
import Modal from '../ui/Modal'
import CItyModal from './CItyModal'

type Props = {}

const Header = (props: Props) => {
    const [cityOpened, setCityOpened] = useState<boolean>(false)
    const [authIsOpened, setAuthOpened] = useState<boolean>(false);
    const authFormHandler = () =>{
      setAuthOpened(!authIsOpened)
    }
    const user = useSelector<RootState>(state => state.user) as initialStateType
    const handlerOpened = () =>{
        setCityOpened(!cityOpened)
    }
  return (
    <>
        <Adaptive showTo={600} >
            <MobileHeader/>
          </Adaptive>
          <Adaptive showFrom={601} >
            <DesktopHeader 
              user={user}
              onCitySelect={handlerOpened}
              authHandler={authFormHandler}
              authIsOpened={false}
            />
          </Adaptive>
          {
            cityOpened &&
           <CItyModal 
              onClose={handlerOpened}
            />
          }
           {authIsOpened && 
          <AuthorizationForm
            onClose={authFormHandler}
          />}
         
    </>
  )
}

export default Header