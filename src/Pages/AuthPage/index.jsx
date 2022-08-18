import React from 'react';
import s from './AuthPage.module.scss';

import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';

import { setUser } from '../../Reducers/UserReducer';

import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db, provider } from '../../firebaseConfig';

import GoogleIcon from '../../assets/img/GoogleIcon.svg';

function AuthPage() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== search id
  const id = uuidv4().slice(0, 8)
  // ======== search id

  // ======== login user
  async function LoginButton() {
    const { user } = await signInWithPopup(auth, provider)
    const object = {
      userDisplayName: user.displayName,
      userEmail: user.email,
      userGoogleId: user.uid,
      userPhoto: user.photoURL,
      userSearchId: id,
      friendChats: [],
      serversList: []
    }

    const userCollection = collection(db, 'users')
    const quer = query(userCollection, where("userEmail", "==", user.email));
    const data = await getDocs(quer)
    data.forEach(qw => {
      //Получаю с бд юзера и диспатчу его
      dispatch(setUser(qw.data()))
    })
    //Если пользователь не найден, добовляю его
    if (data.empty) {
      let ref = doc(db, `users`, user.uid)
      setDoc(ref, object)
      dispatch(setUser(object))
    }
  }
  // ======== login user

  return (
    <div className={s.page}>
      <div className={s.container}>
        <div className={s.item} onClick={LoginButton}>
          <img src={GoogleIcon} alt="" />
          <span>
            Sign in with Google
          </span>
        </div>
      </div>
    </div>
  )
}

export default AuthPage