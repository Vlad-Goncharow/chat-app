import React from 'react';

import s from './ServerPage.module.scss';

import { ServerMessages } from '../../Components/ServerMessages';
import { UsersList } from '../../Components/UsersList';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageForm from '../../Components/MessageForm';
import ServerHeader from '../../Components/ServerHeader';
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen';
import { openModal } from '../../Reducers/ModalReducer';
import { ServerServ } from '../../Services/ServerService';

export const ServerPage = React.memo(() => {
  // ======== server service
  const server = new ServerServ()
  // ======== server service

  // ======== check mobile
  const isMobile = useCheckMobileScreen()
  // ======== check mobile

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== serverName
  const { serverName } = useParams()
  // ======== serverName

  // ======== current user
  const { user } = useSelector(store => store.user)
  // ======== current user

  // ======== server info
  const { serverInfo } = useSelector(store => store.serverInfo)
  // ======== server info

  // ======== inpur ref
  const inputRef = React.useRef()
  // ======== inpur ref

  // ======== users menu ref
  const usersRef = React.useRef()
  // ======== users menu ref

  // ======== user menu is open
  const [usersMenu, setUsersMenu] = React.useState(isMobile ? false : true)
  // ======== user menu is open

  // ======== load image
  const [image,setImage] = React.useState(null)
  // ======== load image

  // ======== add new message
  const addNewMessage = async (e) => {
    e.preventDefault()
    try {
      if (inputRef.current.value){
        await server.addNewMessage(user, serverInfo, serverName, inputRef.current.value, image)
        inputRef.current.value = ''
        setImage(null)
        inputRef.current.focus()
      }
    } catch (e) {
      dispatch(openModal('При отправки сообщения произошла ошибка'))
    }
  }
  // ======== add new message

  // ======== check if isMobile true, close user menu
  React.useEffect(() => {
    const listener = (event) => {
      if (!usersRef.current || !usersRef.current.contains(event.target)) {
        setUsersMenu(false)
      }
    }
    if (isMobile) {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }
  }, [isMobile])
  // ======== check if isMobile true, close user menu

  return (
    <div className={s.ServerPage}>
      {/* <ServerLeftPanel setInfoMenu={setInfoMenu}/> */}
      <div className={s.messages}>
        <ServerHeader setUsersMenu={setUsersMenu} usersMenu={usersMenu} />
        <ServerMessages />
        <MessageForm 
          func={addNewMessage} 
          inpRef={inputRef} 
          image={image}
          setImage={setImage}
        />
      </div>
      {
        usersMenu &&
        <UsersList usersRef={usersRef} />
      }
    </div>
  )
})