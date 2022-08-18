import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'
import s from './AddFriend.module.scss'

import { db } from '../../firebaseConfig'

import { useDispatch } from 'react-redux'
import { openModal } from '../../Reducers/ModalReducer'
import { UserService } from '../../Services/UserService'

export default function AddFriend() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== friends list
  const { friends } = useSelector(store => store.friends)
  // ======== friends list

  // ======== input
  const inputRef = React.useRef()
  const [inputValue, setInputValue] = React.useState('')
  const inputChange = (e) => {
    setInputValue(e.target.value)
  }
  // ======== input

  // ======== add friend
  const addFriend = async (e) => {
    e.preventDefault()
    //Проверяю ввел ли человек свой ид
    if (inputRef.current.value === user.userSearchId) {
      dispatch(openModal('Вы не можете добавить в друзья себя!'))
      return
    }
    //Получаю юзера userSearchId которого равен тому что ввел пользователь
    let usersCollection = collection(db, 'users')
    let userQuery = query(usersCollection, where('userSearchId', '==', inputRef.current.value))
    let userData = await getDocs(userQuery)
    if (!userData.empty) {
      //Если такой юзер есть, получвб его
      let searchedUser = userData.docs[0]
      //В коллекции приглашений проверяю есть ли документ с ключем userSearchId равным ключу пользователя
      //Если есть значит пользователь уже отправил приглашение этому человеку
      let invitesCollection = collection(db, `users/${searchedUser.id}/friendsInvites`)
      let inviteQuery = query(invitesCollection, where('userSearchId', '==', user.userSearchId))
      let inviteData = await getDocs(inviteQuery)
      if (inviteData.empty) {
        //Если такого документу нет, проверяю есть ли этот человек уже в друзьях
        const check = friends.find(item => item.userSearchId === inputRef.current.value)
        if (!check) {
          //Если человека в друзьях нет, можно отпровлять ему запрос
          try {
            const us = new UserService(user)
            let ref = doc(db, `users/${searchedUser.id}/friendsInvites`,user.userId)
            setDoc(ref, us.getUser())
          } catch (e) {
            dispatch(openModal('При отправки запроса произошла ошибка'))
          }
        } else {
          //Если есть, оповестить пользователя
          dispatch(openModal('Этот человек уже у вас в друзьях'))
        }
      } else {
        //Если приглашение уже было отправлено, оповещаю пользователя
        dispatch(openModal('Вы уже отправили запрос в друзья!'))
        return
      }
    } else {
      //Если такого юзера нет, оповещаю пользователя
      dispatch(openModal('Такого пользователя нет!'))
      return
    }
  }
  // ======== add friend

  // ======== res status
  const [reqSuccess, setReqSuccess] = React.useState(false)
  // ======== res status

  return (
    <div className={s.wrapper}>
      <p className={s.descr}>Найдите друга используя его уникальный идентификатор</p>
      <form action="" onSubmit={addFriend} className={s.form}>
        <div className={s.form_item}>
          <label htmlFor="name">Уникальный идентификатор</label>
          <input
            ref={inputRef}
            id='name'
            type="text"
            placeholder='Введите идентификатор'
            value={inputValue}
            onChange={inputChange}
          />
        </div>

        <div className={s.form_buttons}>
          <button onClick={addFriend} to='/all' className={s.search}>Добавить</button>
        </div>
      </form>
      {
        reqSuccess &&
        <div>Приглашение отправлено!</div>
      }
    </div>
  )
}
