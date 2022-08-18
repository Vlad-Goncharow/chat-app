import React from 'react'
import s from './ServerMessages.module.scss'

import { collection, onSnapshot } from "firebase/firestore";
import {db} from '../../firebaseConfig'

import {useParams} from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

import { openModal } from '../../Reducers/ModalReducer';

import { setServerMessages } from '../../Reducers/ServerMessagesReducer';
import ImageModal from '../ImageModal';

export const ServerMessages = React.memo(() => {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== url params
  const urlParams = useParams()
  // ======== url params

  // ======== server info
  const { serverInfo, serverInfoIsLoading } = useSelector(store => store.serverInfo)
  // ======== server info

  // ======== server message
  const { serverMessages} = useSelector(store => store.serverMessages)
  // ======== server message

  // ======== input - messages block
  const rowRef = React.useRef(null)
  // ======== input - messages block

  // ======== load messages
  React.useEffect(() => {
    if (!serverInfoIsLoading) {
      let ref = collection(db, `servers/${serverInfo.serverId}/${urlParams.serverName}`)
      const qeq = onSnapshot(ref, (doc) => {
        let mess = doc.docs.map(da => {
          return da.data()
        })
        let arr = mess.sort((a, b) => {
          return a.messageTimeStamp - b.messageTimeStamp
        })
        dispatch(setServerMessages(arr))
      }, () => {
        dispatch(openModal('При загрузки сообщений произошла ошибка'))
      })

      return () => {
        qeq()
      }
    }
  }, [serverInfoIsLoading, serverInfo.serverId, urlParams.serverName, dispatch])
  // ======== load messages

  // ======== input focus after new message
  React.useEffect(()=>{
    let q = rowRef.current.scrollHeight
    rowRef.current?.scrollTo({
      top: q,
      behavior: "smooth"
    });
    // inputRef.current.focus()
  }, [serverMessages])
  // ======== input focus after new message

  // ======== modal img url
  const [imageUrl,setImageUrl] = React.useState()
  // ======== modal img url

  // ======== modal images is open
  const [imageIsOpen,setImageIsOpen] = React.useState(false)
  // ======== modal images is open

  // ======== open image modal
  const modalImgOpen = (url) => {
    setImageUrl(url)
    setImageIsOpen(true)
  }
  // ======== open image modal

  return (
    <div className={s.wrapper} ref={rowRef}>
      {
        imageIsOpen &&
        <ImageModal url={imageUrl} setImageIsOpen={setImageIsOpen} />
      }
      {
        serverMessages.length > 0 &&
        serverMessages.map(el =>
          <div className={s.message} key={el.messageId}>
            <div className={s.message_img}>
              <img src={el.messageUserPhoto} alt="" />
            </div>
            <div className={s.block}>
              <div className={s.block_name}>{el.messageUserEmail}</div>
              {
                el.messagesImgUrl &&
                <div className={s.block_img}>
                  <img onClick={() => modalImgOpen(el.messagesImgUrl)} src={el.messagesImgUrl} alt="" />
                </div>
              }
              <div className={s.block_text}>{el.messageText}</div>
            </div>
          </div>
        )
      }
    </div>
  )
})