import React from 'react'
import { Link, useParams } from 'react-router-dom'
import s from './ServerChatName.module.scss'

import { useSelector } from 'react-redux'

import Grid from '../../assets/img/Grid.svg'

export const ServerChatName = React.memo(({ el }) => {
  //url params
  const urlParms = useParams()
  //url params

  //server info
  const { serverInfo } = useSelector(store => store.serverInfo)
  //server info
  
  return (
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
})