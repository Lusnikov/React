import React, { ReactHTMLElement, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/DesktopLogo.png'
import { useAppDispatch } from '../../store'
import { initialStateType, logout } from '../../store/slice/userSlice'
import AuthUserBlock from '../Header/AuthUserBlock'
import AuthorizationForm from '../ui/AuthorizationForm'
import AuthorizedUserIcon from '../ui/AuthorizedUserIcon'
import CartItem from '../ui/CartItem'
import NotificationItem from '../ui/NotificationItem'
import Icon from './Icon'


type UserNameProps = {
    menuOpened: boolean
}

const Wrapper = styled.div`

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

const Content = styled.div`
    max-width: 1364px;
    margin: 0 auto;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding:  3rem 0;
`

const CitySelector = styled.div`
  cursor: pointer;
`

const ShevronBlock = styled.div`
  & .title{
    color: #999999;
    font-size: 20px;
    margin-right: 6px;
  }
`

const CurrentCity = styled.h3`
  text-align: center;
  font-size: 18px;
  color: #7B89BA;
`

const Navigation = styled.nav`
  a{
    font-size: 20px;
    color: #404040; 
    &:not(:last-child){
      margin-right: 46px;
    }
  }
`

const ProfileBlock = styled.div`
  display: flex;  
  align-items: center;

  &>div:not(:last-child){
    margin-right: 26px;
  }
`

const UserBlock = styled.div`
  position: relative ;
  display: flex;
  align-items: center;


`


const UserName = styled.p`
    margin-left: 8px;
    padding-right: 24px;
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
const Bonuses = styled.div<any>`
  margin-bottom: 10px;
`

const UnauthorizedUser = styled.div`
  
`

type Props = {
  onCitySelect: () => void,
  user: initialStateType,
  authHandler: () => void,
  authIsOpened: boolean
}

const DesktopHeader = (props: Props) => {
  const {onCitySelect, user, authHandler, authIsOpened} = props
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false)

  // const dispatch = useAppDispatch()

  // const setMenuHandler = () =>{
  //   setUserMenuOpened(!userMenuOpened)
  // }

  // const closeHandler = () =>{
  //   setUserMenuOpened(false)

  // }

 

  return (
    <Wrapper>
      <Content>
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>

        <CitySelector onClick={onCitySelect}>
             <ShevronBlock className="choose_city">
                <span className="title">Выберите город</span>
                <svg className="shevron"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.354 0.646008C13.4006 0.692454 13.4375 0.74763 13.4627 0.808375C13.4879 0.86912 13.5009 0.934241 13.5009 1.00001C13.5009 1.06578 13.4879 1.1309 13.4627 1.19164C13.4375 1.25239 13.4006 1.30756 13.354 1.35401L7.35401 7.35401C7.30756 7.40057 7.25239 7.43751 7.19164 7.46272C7.13089 7.48793 7.06577 7.5009 7.00001 7.5009C6.93424 7.5009 6.86912 7.48793 6.80837 7.46272C6.74763 7.43751 6.69245 7.40057 6.64601 7.35401L0.646007 1.35401C0.55212 1.26012 0.499375 1.13278 0.499375 1.00001C0.499375 0.867233 0.55212 0.739895 0.646007 0.646008C0.739893 0.552122 0.867231 0.499377 1.00001 0.499377C1.13278 0.499377 1.26012 0.552122 1.35401 0.646008L7.00001 6.29301L12.646 0.646008C12.6925 0.599445 12.7476 0.562502 12.8084 0.537296C12.8691 0.512089 12.9342 0.499115 13 0.499115C13.0658 0.499115 13.1309 0.512089 13.1916 0.537296C13.2524 0.562502 13.3076 0.599445 13.354 0.646008Z" fill="black"/>
                </svg>
              </ShevronBlock>
              <CurrentCity>
                  Москва
              </CurrentCity>

        </CitySelector>
        
        <Navigation>
           <Link to={'/'}>Заказ</Link>
           <Link to={'/about-us'}>О нас</Link>
           <Link to={'/career'}>Карьера</Link>
        </Navigation>
        
        <AuthUserBlock user={user}/>
        {/* {user &&  <ProfileBlock>
          <Icon badgeValue={1}>
            <NotificationItem/>
          </Icon>
          <Icon badgeValue={1}>
            <CartItem/>
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
        </ProfileBlock>} */}

        {!user && <UnauthorizedUser>
              <UserBlock 
                    style={{cursor: 'pointer'}}
                    onClick={authHandler}
              >
                  <Icon >
                    <AuthorizedUserIcon/>
                  </Icon>
                  <UserName >
                      Войти в профиль
                  </UserName>

                
                   
          </UserBlock>
         
          </UnauthorizedUser>}
       
      </Content>
    </Wrapper>
  )
}

export default DesktopHeader