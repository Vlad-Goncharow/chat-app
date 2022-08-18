import React from 'react';
import s from './ChatPage.module.scss';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebaseConfig';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import { setMessages } from '../../Reducers/FriendChatReducer';
import { FriendService } from '../../Services/FriendsService';

import ImageModal from '../../Components/ImageModal';
import MessageForm from '../../Components/MessageForm';
import MobileBackLogo from '../../Components/MobileBackLogo';
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen';
import { UserService } from '../../Services/UserService';

export default function ChatPage() {
  // ======== check mobile
  const isMobile = useCheckMobileScreen()
  // ======== check mobile

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== userId
  const { userId } = useParams()
  // ======== userId

  // ======== friend service
  const friendService = new FriendService()
  // ======== friend service

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== load friend messages
  React.useEffect(() => {
    const id = new UserService().getFriendChatId(user, userId)
    let ref = collection(db, `chats/${id}/messages`)
    let res = onSnapshot(ref, (item) => {
      let arr = item.docs.map(el => {
        return el.data()
      }).sort((a, b) => {
        return a.messageTimeStamp - b.messageTimeStamp
      })

      dispatch(setMessages(arr))
    }, () => {
      dispatch(openModal('При загрузки сообщений произошла ошибка!'))
    })

    return () => {
      res()
    }
  }, [])
  // ======== load friend messages

  // ======== friends messages
  const { friendMessages } = useSelector(store => store.friendChat)
  // ======== friends messages

  // ======== input ref
  const inputRef = React.useRef()
  // ======== input ref

  // ======== image load
  const [image, setImage] = React.useState(null)
  // ======== image load

  // ======== add new message
  const add = async (e) => {
    e.preventDefault()
    try {
      if (inputRef.current.value){
        friendService.sendMessage(user, userId, inputRef.current.value, image)
        inputRef.current.value = ''
        setImage(null)
      }
    } catch(e) {
      dispatch(openModal('При отправки сообщения произоша ошибка'))
    }
  }
  
  // ======== add new message
  const rowRef = React.useRef(null)
  React.useEffect(() => {
    let q = rowRef.current.scrollHeight
    rowRef.current?.scrollTo({
      top: q,
      behavior: "smooth"
    });
    // inputRef.current.focus()
  }, [friendMessages])

  // ======== friend list
  const {friends} = useSelector(store => store.friends)
  // ======== friend list

  // ======== name current friend
  const friend = React.useMemo(() => {
    return friends.filter(el => el.userSearchId === userId)[0]
  }, [friends, userId])
  // ======== name current friend

  // ======== check mobile logo
  const checkMobileLogo = () => {
    if (isMobile){
      return (<MobileBackLogo />)
    } else {
      return (
        <div className={s.title}>
          <svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v2.016h-16.031v-2.016q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z"></path></svg>
          <span>{friend?.userEmail}</span>
        </div>
      )
    }
  }
  // ======== check mobile logo

  // ======== img url
  const [imageUrl, setImageUrl] = React.useState()
  // ======== img url

  // ======== img modal is open
  const [imageIsOpen, setImageIsOpen] = React.useState(false)
  // ======== img modal is open

  // ======== open img modal
  const openModal = (url) => {
    setImageUrl(url)
    setImageIsOpen(true)
  }
  // ======== open img modal

  return (
    <>
      {
        imageIsOpen  &&
        <ImageModal url={imageUrl} setImageIsOpen={setImageIsOpen} /> 
      }
      <div className={s.messages}>
        <header className={s.header}>
          <div className={s.left}>
            {checkMobileLogo()}
          </div>
        </header>
          <div ref={rowRef} className={s.row}>
            {
              friendMessages.length > 0 &&
              friendMessages.map(el =>
                <div className={s.message + ' ' + s.message_left} key={el.messageId}>
                  <div className={s.message_img}>
                    <img src={el.messageUserPhoto} alt="" />
                  </div>
                  <div className={s.block}>
                    <div className={s.block_name}>{el.messageUserEmail}</div>
                    {
                      el.messageImgUrl &&
                      <div onClick={() => openModal(el.messageImgUrl)} className={s.block_img}>
                        <img src={el.messageImgUrl} alt=""/>
                      </div>
                    }
                    <div className={s.block_text}>{el.messageText}</div>
                  </div>
                </div>
              )
            }
          </div>
          <MessageForm 
            func={add} 
            inpRef={inputRef} 
            image={image}
            setImage={setImage}
          />
      </div>
    </>
  )
}
