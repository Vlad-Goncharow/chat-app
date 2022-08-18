import React from 'react'
import s from './ServerHeader.module.scss'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen'

function ServerHeader({ setUsersMenu, usersMenu }) {
  // ========  check mobile
  const isMobile = useCheckMobileScreen()
  // ========  check mobile

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== server name
  const { serverName } = useParams()
  // ======== server name

  // ======== toggle users menu
  const toggleUsers = () => {
    setUsersMenu(prev => !prev)
  }
  // ======== toggle users menu

  // ========  back
  const back = () => {
    navigate(-1)
  }
  // ========  back

  // ======== check mobile header
  const checkMobile = () => {
    if (isMobile) {
      return (
        <>
          <div onClick={back} className={s.icon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill='#888a91' viewBox="-265 388.9 64 64"><path d="M-244.5 411h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6zM-228.1 411h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c.1.9-.7 1.6-1.6 1.6zM-211.6 411h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6zM-244.5 427.5h-9.9c-.9 0-1.6-.7-1.6-1.6V416c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .8-.7 1.6-1.6 1.6zM-228.1 427.5h-9.9c-.9 0-1.6-.7-1.6-1.6V416c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c.1.8-.7 1.6-1.6 1.6zM-211.6 427.5h-9.9c-.9 0-1.6-.7-1.6-1.6V416c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .8-.7 1.6-1.6 1.6zM-244.5 443.9h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6zM-228.1 443.9h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c.1.9-.7 1.6-1.6 1.6zM-211.6 443.9h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6z" /></svg>
            <span>{serverName}</span>
          </>
        </>
      )
    } else {
      return (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill='#888a91' viewBox="-265 388.9 64 64"><path d="M-244.5 411h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6zM-228.1 411h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c.1.9-.7 1.6-1.6 1.6zM-211.6 411h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6zM-244.5 427.5h-9.9c-.9 0-1.6-.7-1.6-1.6V416c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .8-.7 1.6-1.6 1.6zM-228.1 427.5h-9.9c-.9 0-1.6-.7-1.6-1.6V416c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c.1.8-.7 1.6-1.6 1.6zM-211.6 427.5h-9.9c-.9 0-1.6-.7-1.6-1.6V416c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .8-.7 1.6-1.6 1.6zM-244.5 443.9h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6zM-228.1 443.9h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c.1.9-.7 1.6-1.6 1.6zM-211.6 443.9h-9.9c-.9 0-1.6-.7-1.6-1.6v-9.9c0-.9.7-1.6 1.6-1.6h9.9c.9 0 1.6.7 1.6 1.6v9.9c0 .9-.7 1.6-1.6 1.6z" /></svg>
          <span>{serverName}</span>
        </>
      )
    }
  }
  // ======== check mobile header

  return (
    <header className={s.header}>
      <div className={s.left}>
        {checkMobile()}
      </div>
      <div className={s.right}>
        <svg
          onClick={toggleUsers}
          fill={usersMenu ? '#fff' : '#dcddde'}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v2.016h-16.031v-2.016q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z"></path>
        </svg>
      </div>
    </header>
  )
}

export default ServerHeader