import React from 'react'

import s from './FriendsHeader.module.scss'

import PersonGray from '../../assets/img/PersonGray.svg'
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen'
import MobileBackLogo from '../MobileBackLogo'

function FriendsHeader({ setCategory, category }) {
  //check is mobile
  const isMobile = useCheckMobileScreen()

  const checkMobile = () => {
    if(isMobile){
      return (
        <MobileBackLogo />
      )
    } else {
      return (
        <div className={s.friends}>
          <img src={PersonGray} alt="" />
          <span>Друзья</span>
        </div>
      )
    }
  }
  //check is mobile

  return (
    <div className={s.header}>
      <div className={s.row}>
        {checkMobile()}
        <div onClick={() => setCategory('friends')} className={category === 'friends' ? s.item + ' ' + s.item_active : s.item}>
          Все
        </div>
        <div onClick={() => setCategory('requests')} className={category === 'requests' ? s.item + ' ' + s.item_active :s.item}>
          Запросы
        </div>
        <div onClick={() => setCategory('add-friend')} className={s.item + ' ' + s.item_add}>
          Добавить в друзья
        </div>
      </div>
    </div>
  )
}

export default FriendsHeader