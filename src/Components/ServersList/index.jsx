import React from 'react';

import s from './ServersList.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { setServersList } from '../../Reducers/ServerListReducer';

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import useCheckMobileScreen from '../../Hooks/useCheckMobileScreen';

export const ServersList = React.memo(() => {
  // ======== check mobile
  const isMobile = useCheckMobileScreen()
  // ======== check mobile

  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== current user
  const { user, userIsLoading } = useSelector(store => store.user)
  // ======== current user

  // ======== servers
  const { serverList, serverListIsLoading } = useSelector(store => store.serverList)
  // ======== servers

  // ======== get servers
  React.useEffect(() => {
    if (!userIsLoading) {
      (async () => {
        let chatsRef = collection(db, 'servers')
        let arr = []
        for (let i = 0; i < user.serversList.length; i++) {
          let el = user.serversList[i]
          let quer = query(chatsRef, where('serverSearchId', '==', el))
          let doc = await getDocs(quer)
          if (!doc.empty) {
            arr.push(doc.docs[0].data())
          }
        }
        dispatch(setServersList(arr))
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsLoading, user])
  // ======== get servers

  // ======== check mobile link
  const check = (id) => {
    return isMobile ? `/server/${id}` : `/server/${id}/general`
  }
  // ======== check mobile link

  return (
    <div className={s.list}>
      {
        <>
          <Link
            to={`/home`}
            className={s.chat}
          >
            <div className={s.chat_img} >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20" fill="none">
                <path d="M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.0712299 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.0712299 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z" fill="#DCDDDE" />
              </svg>
            </div>
          </Link>
          {
            serverListIsLoading ?
              null
              :
              serverList.map(chat =>
                <Link
                  to={check(chat.serverSearchId)}
                  className={s.chat}
                  key={chat.serverSearchId}
                >
                  <div className={s.chat_img}>
                    <img src={chat.serverImageUrl} className={s.chat_srcImage} alt='' />
                  </div>
                </Link>
              )
          }
          <Link to='/create' className={s.chat}>
            <div className={s.chat_img} >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.001H13V3.00098H11V11.001H3V13.001H11V21.001H13V13.001H21V11.001Z" fill="#43B581" />
              </svg>
            </div>
          </Link>
          <Link to='/search' className={s.chat}>
            <div className={s.chat_img} >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.80118 9.60398C4.80118 6.94647 6.94641 4.80124 9.60392 4.80124C12.2614 4.80124 14.4067 6.94647 14.4067 9.60398C14.4067 12.2615 12.2614 14.4067 9.60392 14.4067C6.94641 14.4067 4.80118 12.2615 4.80118 9.60398ZM16.0076 14.4067H15.1644L14.8656 14.1186C15.9115 12.9019 16.5412 11.3223 16.5412 9.60398C16.5412 5.77246 13.4354 2.66669 9.60392 2.66669C5.7724 2.66669 2.66663 5.77246 2.66663 9.60398C2.66663 13.4355 5.7724 16.5413 9.60392 16.5413C11.3222 16.5413 12.9018 15.9116 14.1185 14.8657L14.4067 15.1645V16.0076L19.7431 21.3334L21.3333 19.7431L16.2803 14.68L16.0076 14.4067Z" fill="#43B581" />
              </svg>
            </div>
          </Link>
        </>
      }
    </div>
  )
})
