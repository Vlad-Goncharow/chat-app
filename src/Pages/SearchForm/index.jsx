import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { db } from '../../firebaseConfig';

import s from './SearchForm.module.scss';

import { useNavigate } from 'react-router-dom';

import { useDebounce } from '../../Hooks/useDebounce';
import { openModal } from '../../Reducers/ModalReducer';

function SearchForm() {
  const dispatch = useDispatch()
  // ======== navigation
  const navigate = useNavigate()
  // ======== navigation

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== input
  const inputRef = React.useRef()

  const [inputValue, setInputValue] = React.useState('')
  function inputChange(e) {
    setInputValue(e.target.value)
  }
  // ======== input

  // ======== finded chat
  const [chat, setChat] = React.useState()
  // ======== finded chat

  // ======== connect to server
  async function joinToChat(e) {
    e.preventDefault()
    if (chat) {
      const collec = collection(db, `servers/${chat.id}/serverUsers`)
      const query2 = query(collec, where("userEmail", '==', user.userEmail))
      let ewq = await getDocs(query2)
      if (ewq.empty) {
        const userRef = doc(db, 'users', user.userId)
        updateDoc(userRef, {
          serversList: arrayUnion(chat.serverSearchId),
        })
        addDoc(collection(db, `servers/${chat.id}/serverUsers`), user)
        navigate(-1)
      } else {
        dispatch(openModal('Вы уже на этом сервере'))
      }
    }
  }
  // ======== connect to server

  // ======== deboune user type
  let check = useDebounce(inputValue, 2000)
  React.useEffect(() => {
    if (check) {
      const userCollection = collection(db, 'servers')
      const quer = query(userCollection, where("serverSearchId", "==", check));
      getDocs(quer).then(el => {
        if (!el.empty) {
          el.forEach(doc => {
            setChat({
              ...doc.data(),
              id: doc.id
            })
          })
        }
      })
    }
  }, [check])
  // ======== deboune user type

  // ======== first render focus on input
  React.useEffect(() => {
    inputRef.current.focus()
  }, [])
  // ======== first render focus on input

  //back
  const back = () => {
    navigate(-1)
  }
  //back

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Пойск сервера</h1>
        <p className={s.descr}>Найдите сервер используя уникальный идентификатор</p>
        <form action="" className={s.form}>
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
          {
            chat &&
            <div className={s.chat}>
              <div className={s.chat_wrapper}>
                <div className={s.chat_image}>
                  <img src={chat.serverImageUrl} alt="" />
                </div>
                <div className={s.chat_name}>{chat.serverName}</div>
              </div>
              <div className={s.chat_connect} onClick={joinToChat}>Войти</div>
            </div>
          }
          <div className={s.form_buttons}>
            <div onClick={back} className={s.back}>На главную</div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchForm