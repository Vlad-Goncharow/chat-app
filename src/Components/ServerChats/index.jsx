import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig'

import Grid from '../../assets/img/Grid.svg'
import s from './ServerChats.module.scss'

function ServerChats() {
  //url params
  const urlParms = useParams
  //url params

  //server info
  const { serverInfo, serverInfoIsLoading } = useSelector(store => store.serverInfo)
  //server info

  //text chats
  const [chats, setChats] = React.useState([])
  //text chats

  //load text chats
  React.useEffect(() => {
    if (!serverInfoIsLoading) {
      const ref = doc(db, `servers`, serverInfo.serverId)
      const dis = onSnapshot(ref, (el) => {
        if (!el.empty) {
          setChats(el.data().serverChatsList)
        }
      })

      return () => {
        dis()
      }
    }
  }, [serverInfoIsLoading, serverInfo])
  //load text chats

  return (
    <div className={s.chats}>
      {
        chats.length > 0 &&
        chats.map(el =>
          <Link
            to={`/server/${serverInfo.serverSearchId}/${el}`}
            key={el}
            className={urlParms.serverName === el ? s.chat + ' ' + s.chat_active : s.chat}
          >
            <img src={Grid} alt="" />
            <span>
              {el}
            </span>
          </Link>
        )
      }
    </div>
  )
}

export default ServerChats