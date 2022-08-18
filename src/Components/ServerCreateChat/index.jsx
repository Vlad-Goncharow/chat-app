import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebaseConfig'
import s from './ServerCreateChat.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../Reducers/ModalReducer'

function ServerCreateChat({ setChatMenuIsOpen }) {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== input ref
  const inputRef = React.useRef()
  // ======== input ref

  // ======== server info
  const { serverInfo } = useSelector(store => store.serverInfo)
  // ======== server info

  // ======== create text chat
  const createNewTextChat = async (e) => {
    e.preventDefault()
    if (inputRef.current.value) {
      try {
        const washingtonRef = doc(db, "servers", serverInfo.serverId);
        updateDoc(washingtonRef, {
          serverChatsList: arrayUnion(inputRef.current.value)
        })
        inputRef.current.value = ''
      } catch (e) {
        dispatch(openModal('При создание текстового канала прозошла ошибка'))
      }
    }
  }
  // ======== create text chat

  // ======== when chat menu opened focus on input
  React.useEffect(() => {
    inputRef.current.focus()
  }, [])
  // ======== when chat menu opened focus on input

  return (
    <div className={s.create}>
      <form onSubmit={createNewTextChat} action="" className={s.form}>
        <input
          ref={inputRef}
          type="text"
          placeholder='Введите название'
          className={s.form_input}
        />
      </form>
      <div className={s.buttons}>
        <button
          onClick={() => setChatMenuIsOpen(false)}
          className={s.buttons_btn + ' ' + s.buttons_btn_close}
        >
          Закрыть
        </button>
        <button
          onClick={createNewTextChat}
          type='submit'
          className={s.buttons_btn + ' ' + s.buttons_btn_create}
        >
          Создать
        </button>
      </div>
    </div>
  )
}

export default ServerCreateChat