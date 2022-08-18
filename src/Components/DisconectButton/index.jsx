import React from 'react';

import s from './DisconectButton.module.scss';

import { signOut } from "firebase/auth";

import { useDispatch } from 'react-redux';

import { auth } from '../../firebaseConfig';

import { clearUser } from '../../Reducers/UserReducer';

import { useNavigate } from 'react-router-dom';

function DisconectButton() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== logout
  const logout = async () => {
    try {
      dispatch(clearUser())
      signOut(auth)
      navigate('/')
    } catch(e){
      console.log(e);
    }
  }
  // ======== logout

  return (
    <button className={s.btn} onClick={logout}>Выйти</button>
  )
}

export default DisconectButton