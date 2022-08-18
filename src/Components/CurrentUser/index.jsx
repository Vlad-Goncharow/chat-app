import React from 'react'

import s from './CurrentUser.module.scss'

import {useSelector} from 'react-redux'

import Setting from '../../assets/img/Setting.svg'

import {Link} from 'react-router-dom'

export const CurrentUser = React.memo(() => {
  // ======== user
  const {user} = useSelector(store => store.user)
  // ======== user
  
  return (
    <div className={s.user}>
      <div className={s.left}>
        <div className={s.user_image}>
          <img src={user?.userPhoto} alt=""/>
        </div>
        <div>
          <div className={s.user_name}>{user?.userDisplayName}</div>
          <div className={s.user_id}>{user?.userSearchId}</div>
        </div>
      </div>
      <Link to='/userSetting' className={s.right}>
        <img src={Setting} alt=""/>
      </Link>
    </div>
  )
})
