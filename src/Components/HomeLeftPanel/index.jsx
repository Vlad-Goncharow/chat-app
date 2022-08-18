import React from 'react'

import s from './HomeLeftPanel.module.scss'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { CurrentUser } from '../CurrentUser'

import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen'
import { openModal } from '../../Reducers/ModalReducer'
import { FriendService } from '../../Services/FriendsService'

export const HomeLeftPanel = React.memo(() => {
  //check is mobile
  const isMobile = useCheckMobileScreen()
  //check is mobile

  // ======== Friend service
  const friend = new FriendService()
  // ======== Friend service

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== current user
  const { user, userIsLoading } = useSelector(store => store.user)
  // ======== current user

  // ======== remove friend chat
  const remove = async (e, chat) => {
    e.preventDefault()
    try {
      friend.deleteChat(user, chat)
    } catch (e) {
      dispatch(openModal('При удалении произошла ошибка!'))
    }
  }
  // ======== remove friend chat

  // ======== chats
  const chats = React.useMemo(() => {
    if (!userIsLoading) {
      return user.friendChats.map(el => {
        return JSON.parse(el)
      })
    } else {
      return []
    }
  }, [user, userIsLoading])
  // ======== chats

  return (
    <div className={s.panel}>
      <div className={s.top}>
        <Link to={isMobile ? '/friends' : '/home'} className={s.item}>
          <svg fill='#fff' version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v2.016h-16.031v-2.016q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z"></path>
          </svg>
          <span>Друзья</span>
        </Link>
        <div className={s.messages}>
          <div className={s.messages_item}>
            <span>Личные сообщения</span>
          </div>
          {
            userIsLoading === false &&
            chats.map(el =>
              <Link to={`/chat/${el.id}`} key={el.id} className={s.user}>
                <div className={s.user_img}>
                  <img src={el.photo} alt="" />
                </div>
                <div className={s.user_name}>
                  {el.name}
                </div>
                <div onClick={(e) => remove(e, el)} className={s.user_delete}></div>
              </Link>
            )
          }
        </div>
      </div>
      {
        <CurrentUser />
      }
    </div>
  )
})