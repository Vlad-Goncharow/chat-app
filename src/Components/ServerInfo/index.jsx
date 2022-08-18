import React from 'react'
import s from './ServerInfo.module.scss'

import { useSelector } from 'react-redux'

function ServerInfo({ setInfoMenu }) {
  // ======== current server
  const { serverInfo } = useSelector(store => store.serverInfo)
  const { serverUsers } = useSelector(store => store.serverUsers)
  // ======== current server

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Информация о сервере</h1>
      <p className={s.descr}>
        Публичная информация о сервере <br /> добовляте друзей
      </p>

      <div className={s.info}>
        <div className={s.info_item}>
          <h2 className={s.info_title}>Изображение сервера</h2>
          <div className={s.upload}>
            <div className={s.upload_item}>
              <img src={serverInfo.serverImageUrl} alt="" />
            </div>
          </div>
        </div>
        <div className={s.info_item}>
          <h2 className={s.info_title}>Название сервера</h2>
          <p className={s.info_subtitle}>{serverInfo.serverName}</p>
        </div>
        <div className={s.info_item}>
          <h2 className={s.info_title}>Идентификатор сервера</h2>
          <p className={s.info_subtitle}>{serverInfo.serverSearchId}</p>
        </div>
        <div className={s.info_item}>
          <h2 className={s.info_title}>Администратор сервера</h2>
          <p className={s.info_subtitle}>{serverInfo.serverOwner}</p>
        </div>
        <div className={s.info_item}>
          <h2 className={s.info_title}>Пользователи сервера</h2>
          <div className={s.info_users}>
            {
              serverUsers.map(el =>
                <div className={s.user}>
                  {el.userEmail}
                </div>
              )
            }
          </div>
        </div>
        <button className={s.back} onClick={() => setInfoMenu(false)}>Назад</button>
      </div>
    </div>
  )
}

export default ServerInfo