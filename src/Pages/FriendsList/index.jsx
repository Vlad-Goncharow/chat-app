import React from 'react'

import s from './FriendsList.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import Friend from '../../Components/Friend'

import { setFriends } from '../../Reducers/FriendsReducer'
import { openModal } from '../../Reducers/ModalReducer'

import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

import Search from '../../assets/img/Search.svg'

function FriendsList() {
  // ======== current user
  const { user, userIsLoading } = useSelector(store => store.user)
  // ======== current user

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== load friends
  React.useEffect(() => {
    if (!userIsLoading) {
      let ref = collection(db, `users/${user.userId}/usersFriends`)
      const dis = onSnapshot(ref, async doc => {
        if (!doc.empty) {
          let arr = doc.docs.map(el => {
            return el.data()
          })
          dispatch(setFriends(arr))
        } else {
          dispatch(setFriends([]))
        }
      }, () => {
        dispatch(openModal('При загрузки списка друзей произошла ошибка!'))
      })

      return () => {
        dis()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsLoading])
  // ======== load friends

  // ======== friends
  const { friends } = useSelector(store => store.friends)
  // ======== friends

  // ======== input
  const [inputValue, setInputvalue] = React.useState('')
  const inputChange = (e) => {
    setInputvalue(e.target.value)
  }
  // ======== input

  // ======== stort friends
  const friendsSort = React.useMemo(() => {
    if (friends) {
      if (inputValue) {
        return friends.filter(el => el.userDisplayName.toLowerCase().includes(inputValue.toLowerCase()))
      }
      return friends
    }
  }, [inputValue, friends])

  // ======== check input value
  function checkValue() {
    if (inputValue.length > 0) {
      return (
        <div onClick={() => setInputvalue('')} className={s.close}></div>
      )
    } else {
      return (
        <img className={s.searchIcon} src={Search} alt="" />
      )
    }
  }
  // ======== check input value

  return (
    <div className={s.page}>
      <form action="" className={s.search}>
        <input placeholder='Пойск' value={inputValue} type="text" onChange={inputChange} />
        {
          checkValue()
        }
      </form>
      <div className={s.count}>ВСЕГО ДРУЗЕЙ - {friendsSort.length}</div>
      <div className={s.list}>
        {
          friendsSort.length > 0 &&
          friendsSort.map((el, i) =>
            <Friend key={el.userSearchId} el={el} i={i} />
          )
        }
      </div>
    </div>

  )
}

export default FriendsList