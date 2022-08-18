import React from 'react'
import { CurrentUser } from '../CurrentUser'

import s from './ServerLeftPanel.module.scss'

import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearServerInfo, setServerInfo } from '../../Reducers/ServerInfoReducer'
import { ServerServ } from '../../Services/ServerService'


import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import ServerCreateChat from '../ServerCreateChat'

import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen'
import ServerChats from '../ServerChats'
import { ref, listAll, deleteObject } from 'firebase/storage'
import { storage } from '../../firebaseConfig'


export function ServerLeftPanel({ setInfoMenu }) {
  //check mobile
  const isMobile = useCheckMobileScreen()
  //check mobile

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== url params
  const { serverId, serverName } = useParams()
  // ======== url params

  // ======== server info
  const { serverInfo } = useSelector(store => store.serverInfo)
  // ======== server info

  // ======== server info
  const { serverMessages } = useSelector(store => store.serverMessages)
  // ======== server info

  // ======== serever service
  const server = new ServerServ(serverInfo.serverId, serverName)
  // ======== serever service

  // ======== load server info
  React.useEffect(() => {
    (async () => {
      let info = await server.getSeverInfo(serverId)

      dispatch(setServerInfo(info))

      return () => {
        dispatch(clearServerInfo())
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverId])
  // ======== load server info

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== deleere server
  const deleteServ = () => {
    (async () => {
      navigate('/home')
      await server.deleteServer(serverInfo.serverChatsList, serverInfo.serverSearchId, user.userId, serverInfo.serverImageName)

      try {
        serverMessages.forEach(el => {
          const reff = ref(storage, `server-${serverInfo.serverSearchId}/${el.messagesImgName}`)
          deleteObject(reff)
        })
      } catch (e) {
        console.log(e);
      }
    })()
  }
  // ======== deleere server

  // ======== menu server info
  const [isActive, setIsActive] = React.useState(false)

  const toggleMenu = () => {
    setIsActive(prev => !prev)
  }
  // ======== menu server info

  // create new text chat menu
  const [chatMenuIsOpen, setChatMenuIsOpen] = React.useState(false)
  // create new text chat menu

  //back
  const back = () => {
    navigate(-1)
  }
  //back

  return (
    <div className={s.page}>
      <header className={s.header}>
        <div className={s.header_left}>
          {
            isMobile &&
            <div onClick={back} className={s.icon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          }
          <div className={s.panel_name}>{serverInfo.serverName}</div>
        </div>
        <div className={isActive ? s.panel_close : s.panel_more} onClick={toggleMenu}></div>
      </header>

      {
        isActive &&
        <div className={s.menu}>
          <div className={s.menu_wrapper}>
            <ul className={s.menu_list}>
              <li >
                <button
                  className={s.menu_listItem + ' ' + s.menu_listItem_info}
                  onClick={() => setInfoMenu(true)}
                >
                  Информация о сервере
                </button>
              </li>
              {
                serverInfo.serverOwner === user.userEmail &&
                <li >
                  <button
                    className={s.menu_listItem + ' ' + s.menu_listItem_delete}
                    onClick={deleteServ}
                  >
                    Удалить сервер
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>
      }

      <div className={s.createChat}>
        <div className={s.chanelType}>Текстовые чаты</div>
        {
          serverInfo.serverOwner === user?.userEmail &&
          <div onClick={() => setChatMenuIsOpen(true)} className={s.createChat_plus}></div>
        }
      </div>

      {
        chatMenuIsOpen &&
        <ServerCreateChat setChatMenuIsOpen={setChatMenuIsOpen} />
      }
      <ServerChats />
      <CurrentUser />
    </div>
  )
}
