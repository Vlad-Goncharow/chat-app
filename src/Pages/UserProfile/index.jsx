import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import s from './UserProfile.module.scss'

function UserProfile() {
  // ======== profile friend
  const { profile } = useSelector(store => store.profile)
  // ======== profile friend

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== back
  const back = () => {
    navigate(-1)
  }
  // ======== back

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <header className={s.header}>
          <h1 className={s.title}>Профиль пользователя {profile.userDisplayName}</h1>
        </header>
        <div className={s.block}>
          <div className={s.block_top}></div>
          <div className={s.block_bottom}>
            <header className={s.block_center}>
              <div className={s.block_avatar}>
                <img src={profile.userPhoto} alt="" />
              </div>
              <span>
                {profile.userDisplayName} #{profile.userSearchId}
              </span>
            </header>
            <div className={s.block_info + ' ' + s.info}>
              <div className={s.info_item}>
                <div className={s.info_title}>имя пользователя</div>
                <div className={s.info_descr}>{profile.userDisplayName}</div>
              </div>
              <div className={s.info_item}>
                <div className={s.info_title}>электронная почта</div>
                <div className={s.info_descr}>{profile.userEmail}</div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={back} className={s.back}>Назад</button>
      </div>
    </div>
  )
}

export default UserProfile