import React from 'react';

import s from './FriendsRequests.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import { setFriendsRequests } from '../../Reducers/FriendsRequestsReducer';
import { openModal } from '../../Reducers/ModalReducer';
import { FriendService } from '../../Services/FriendsService';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function FriendsRequests() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== current user
  const { user, userIsLoading } = useSelector(store => store.user)
  // ======== current user

  // ======== friendsRequests
  const { friendsRequests, friendsRequestsIsLoading } = useSelector(store => store.friendsRequests)
  // ======== friendsRequests

  // ======== friendService
  const friendService = new FriendService(user.userId)
  // ======== friendService

  // ======== accept friend
  const accept = async (person) => {
    await friendService.acceptFriend(person, user)
  }
  // ======== accept friend

  // ======== decline friend
  const decline = async (person) => {
    await friendService.declineFriend(person, user)
  }
  // ======== decline friend

  // ======== load friend req
  React.useEffect(() => {
    const ref = collection(db, `users/${user.userId}/friendsInvites`)
    const dis = onSnapshot(ref, data => {
      if (!data.empty) {
        let arr = data.docs.map(el2 => {
          return {
            ...el2.data(),
            inviteId: el2.id
          }
        })
        dispatch(setFriendsRequests(arr))
      } else {
        dispatch(setFriendsRequests([]))
      }
    }, () => {
      dispatch(openModal('При загрузки запросов произошла ошибка'))
    })

    return () => {
      dis()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsLoading])
  // ======== load friend req

  return (
    <div className={s.row}>
      {
        friendsRequestsIsLoading === false &&
        friendsRequests.map(el =>
          <div key={el.userSearchId} className={s.user}>
            <div className={s.top}>
              <div className={s.image}>
                <img src={el.userPhoto} alt="" />
              </div>
              <div className={s.info}>
                <div className={s.info_name}>{el.userDisplayName}</div>
                <div className={s.info_id}>{el.userSearchId}</div>
              </div>
            </div>
            <div className={s.bottom}>
              <button className={s.bottom_btn + ' ' + s.bottom_btn_add} onClick={() => accept(el)}>Принять</button>
              <button className={s.bottom_btn + ' ' + s.bottom_btn_remove} onClick={() => decline(el)}>Отклонить</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default FriendsRequests