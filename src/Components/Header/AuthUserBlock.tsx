import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RootState, useAppDispatch } from '../../store'
import { initialStateType, logout } from '../../store/slice/userSlice'
import { Cart } from '../../types/type'
import Icon from '../styled/Icon'
import AuthorizedUserIcon from '../ui/AuthorizedUserIcon'
import CartItem from '../ui/CartItem'
import NotificationItem from '../ui/NotificationItem'

type Props = {
    user: initialStateType
}

type UserNameProps = {
    menuOpened: boolean
}

const UserBlock = styled.div`
  position: relative ;
  display: flex;
  align-items: center;


`
const Bonuses = styled.div<any>`
  margin-bottom: 10px;
`
const UserExtendedInfo = styled.div`
  padding: 10px 0;
  background: #e9e9e9;
  text-align: center;
  position: absolute;
  width: 100%;
  border: 1px solid black;
  bottom: -20px;
  transform: translateY(100%);

  a{
    display: block;
    margin-bottom: 8px;
    color: #373636
  }
`
const ProfileBlock = styled.div`
  display: flex;  
  align-items: center;

  &>div:not(:last-child){
    margin-right: 26px;
  }
`

const UserName = styled.p`
    margin-left: 8px;
    padding-right: 24px;
`
const UserBlockContent = styled.div<UserNameProps>`
cursor: pointer;
  display: flex;  
  align-items: center;
  &::after{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(${(props => props.menuOpened ? 180 : 0)}deg);
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    background-image: url('./chevron.svg');
    transition: .2s transform linear
  }
`
const AuthUserBlock = ({user}: Props) => {
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false)
  const cart = useSelector<RootState, Cart >(p => p.user?.cart ? p.user.cart : [] )
  const userBlockRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const openedMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() =>{
    const handler = (e: MouseEvent) =>{
      const ref = openedMenuRef.current
      const ref2 = userBlockRef.current
      const target = e.target as Node
      const isBlockClick = ref2?.contains(target)
      if (ref && !ref.contains(target) && !isBlockClick ){
        closeHandler()
      }
    }
    document.addEventListener('mousedown', handler)

    return () =>{
      document.removeEventListener('mousedown', handler)
    }
  }, [openedMenuRef])

  const setMenuHandler = () =>{
    setUserMenuOpened(!userMenuOpened)
  }

  const closeHandler = () =>{
    setUserMenuOpened(false)

  }
  if (user){
return (
    <ProfileBlock>
          <Icon badgeValue={1}>
            <NotificationItem/>
          </Icon>
         
          <Icon badgeValue={cart.length }>
            <Link to={'/cart'}>
              <CartItem/>
            </Link>
          </Icon>
   
  
          
          <UserBlock >
            <UserBlockContent menuOpened={userMenuOpened} onClick={setMenuHandler } ref={userBlockRef} >
              <Icon >
                <AuthorizedUserIcon/>
              </Icon>
              <UserName >
                  {user.userName}
              </UserName>
            </UserBlockContent>
       
            {userMenuOpened && 
             <UserExtendedInfo ref={openedMenuRef}>
              <Bonuses >
                  Spires-бонусов: {user.bonuses}
              </Bonuses>
             <Link to="profile">
                 Профиль
             </Link>
             <Link to="bonuse-shop">
                 Бонусный магазин
             </Link>
             <button 
                onClick={() => dispatch(logout())}>
                 Выйти
             </button>
         </UserExtendedInfo>
            }
           
          </UserBlock>
    </ProfileBlock>
  )
  }
  return <></>
  
}

export default AuthUserBlock