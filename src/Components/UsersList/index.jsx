import React from 'react';

import s from './UsersList.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import { collection, onSnapshot } from "firebase/firestore";

import { db } from '../../firebaseConfig';

import useOnClickOutside from '../../Hooks/useOnClickOutside';

import { setServerUsers } from '../../Reducers/ServerUsersReducer';
import { ServerServ } from '../../Services/ServerService';

import { openModal } from '../../Reducers/ModalReducer';

export const UsersList = React.memo(({ usersRef }) => {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== server service
  const server = new ServerServ()
  // ======== server service

  // ======== is load server info
  const { serverInfo, serverInfoIsLoading } = useSelector(store => store.serverInfo)
  // ======== is load server info

  // ======== serverUsers
  const { serverUsers, serverUsersIsLoading } = useSelector(store => store.serverUsers)
  // ======== serverUsers

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== load server users
  React.useEffect(() => {
    if (!serverInfoIsLoading) {
      const q = collection(db, `servers/${serverInfo.serverId}/serverUsers`)
      const dis = onSnapshot(q, data => {
        let arr = data.docs.map(el => {
          return el.data()
        })
        dispatch(setServerUsers(arr))
      }, () => {
        dispatch(openModal('При заугрузки пользователей произошла ошибка!'))
      })

      return () => {
        dis()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverInfo.serverId, serverInfoIsLoading])
  // ======== load server users

  // ======== friend menu
  const [menuOpenIndex, setMenuOpenIndex] = React.useState(-1)
  const menuRef = React.useRef()
  const openMenu = (index) => {
    setMenuOpenIndex(index)
  }
  // ======== close menu if user click outside menu
  useOnClickOutside(menuRef, () => openMenu(-1))
  // ======== friend menu

  // ======== add friend
  const addToFriend = async (id) => {
    try {
      server.addFriend(user, id)
    } catch (e) {
      dispatch(openModal('При добовлении в друзья произошла ошибка!'))
    }
  }
  // ======== add friend

  return (
    <div ref={usersRef} className={s.users}>
      {
        serverUsersIsLoading === false &&
        <>
          <div className={s.title}>Пользователи</div>
          <div className={s.list}>
            {
              serverUsers.map((el, i) =>
                <div
                  onClick={() => openMenu(i)}
                  key={el.userGoogleId}
                  className={s.user}
                >
                  <div className={s.user_img}>
                    <img src={el.userPhoto} alt="" />
                  </div>
                  <div className={s.user_name}>
                    {el.userDisplayName}
                  </div>

                  {menuOpenIndex === i && <div className={s.menu}>
                    <button onClick={() => addToFriend(el.userSearchId)} ref={menuRef} className={s.menu_add}>Добавить в друзья</button>
                  </div>}
                </div>
              )
            }
          </div>
        </>
      }
    </div>
  )
})