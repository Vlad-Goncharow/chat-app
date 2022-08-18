import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import useOnClickOutside from '../../Hooks/useOnClickOutside'

import { useNavigate } from 'react-router-dom'
import { openModal } from '../../Reducers/ModalReducer'
import { setProfile } from '../../Reducers/ProfileUserReducer'
import s from './Friend.module.scss'

import { collection, getDocs } from 'firebase/firestore'
import { deleteObject } from 'firebase/storage'
import { db, storage } from '../../firebaseConfig'
import { FriendService } from '../../Services/FriendsService'
import { UserService } from '../../Services/UserService'

function Friend({ el, i }) {
  //Friend service
  const friend = new FriendService()
  //Friend service

  //navigate
  const navigate = useNavigate()
  //navigate

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== menu friend is open
  const menuRef = React.useRef(null)
  const [menuOpen, setMenuOpen] = React.useState(-1)
  const openMenu = (num) => {
    setMenuOpen(num)
  }
  useOnClickOutside(menuRef, () => setMenuOpen(-1))
  // ======== menu friend is open

  //delte friend
  const deleteFriend = async () => {
    try {
      friend.delteFriend(user, el)

      // ======== delete all friend chat images
      const id = new UserService().getFriendChatId(user, el)
      const ref = collection(db, `chats/${id}/messages`)
      const messages = await getDocs(ref)
      if (!messages.empty) {
        messages.forEach(el => {
          if (el.data().messageImgName) {
            const reff = ref(storage, `chats-${id}/${el.data().messageImgName}`)
            deleteObject(reff)
          }
        })
      }
      // ======== delete all friend chat images
    } catch (e) {
      dispatch(openModal('При удалении произошла ошибка!'))
    }
  }
  //delte friend

  //create friend chat
  const createFriendChat = async () => {
    try {
      await friend.createChat(user, el)
      navigate(`/chat/${el.userSearchId}`)
    } catch (e) {
      dispatch(openModal('При создании чата произошла ошибка!'))
    }
  }
  //create friend chat

  //friend profile
  const setUserProfile = (user) => {
    dispatch(setProfile(user))
  }
  //friend profile

  return (
    <div className={s.user}>
      <div className={s.user_left}>
        <div className={s.user_image}>
          <img src={el.userPhoto} alt="" />
        </div>
        <div className={s.user_name}>
          {el.userDisplayName}
        </div>
      </div>
      <div className={s.user_right}>
        <div onClick={createFriendChat} className={s.user_icon}>
          <svg version="1.1" fill='#8e9297' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M22 15v-10c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-14c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v16c0 0.256 0.098 0.512 0.293 0.707 0.391 0.391 1.024 0.391 1.414 0l3.707-3.707h11.586c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121zM20 15c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-12c-0.276 0-0.526 0.112-0.707 0.293l-2.293 2.293v-13.586c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h14c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707z"></path>
          </svg>
        </div>
        <div onClick={() => openMenu(i)} className={s.user_icon}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#8e9297'>
            <path d="M14 12c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 5c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 19c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414z"></path>
          </svg>
        </div>
      </div>

      {
        menuOpen === i &&
        <div ref={menuRef} className={s.menu}>
          <Link to={`/profile/${el.userSearchId}`} onClick={() => setUserProfile(el)} className={s.menu_btn}>Посмотреть профиль</Link>
          <div onClick={deleteFriend} className={s.menu_btn}>Удалить из друзей</div>
        </div>
      }
    </div>
  )
}

export default Friend