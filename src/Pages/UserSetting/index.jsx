import React from 'react'
import s from './UserSetting.module.scss'

import { useSelector } from 'react-redux'
import DisconectButton from '../../Components/DisconectButton'

import MobileBackLogo from '../../Components/MobileBackLogo'
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen'

function UserSetting() {
  // ======== check mobile
  const isMobile = useCheckMobileScreen()
  // ======== check mobile
  
  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user
  
  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <header className={s.header}>
          {
            isMobile &&
            <MobileBackLogo />
          }
          <h1 className={s.title}>Моя учётная запись</h1>
        </header>
        <div className={s.block}>
          <div className={s.block_top}></div>
          <div className={s.block_bottom}>
            <header className={s.block_center}>
              <div className={s.block_avatar}>
                <img src={user.userPhoto} alt="" />
              </div>
              <span>
                {user.userDisplayName} #{user.userSearchId}
              </span>
            </header>
            <div className={s.block_info + ' ' + s.info}>
              <div className={s.info_item}>
                <div className={s.info_left}>
                  <div className={s.info_title}>имя пользователя</div>
                  <div className={s.info_descr}>{user.userDisplayName}</div>
                </div>
                <button className={s.info_right}>Изменить</button>
              </div>
              <div className={s.info_item}>
                <div className={s.info_left}>
                  <div className={s.info_title}>электронная почта</div>
                  <div className={s.info_descr}>{user.userEmail}</div>
                </div>
                <button className={s.info_right}>Изменить</button>
              </div>
            </div>
          </div>
        </div>
        <DisconectButton />
      </div>
    </div>
  )
}

export default UserSetting