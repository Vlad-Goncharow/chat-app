import React from 'react';
import {
  Route, Routes, useNavigate
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import { ServersList } from '../Components/ServersList';

import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

import { setUser } from '../Reducers/UserReducer';

import ChatPage from '../Pages/ChatPage';
import Home from '../Pages/Home';
import { ServerPage } from '../Pages/ServerPage';

import ErrorModal from '../Components/ErrorModal';
import { HomeLeftPanel } from '../Components/HomeLeftPanel';
import ServerInfo from '../Components/ServerInfo';
import { ServerLeftPanel } from '../Components/ServerLeftPanel';
import { closeModal } from '../Reducers/ModalReducer';
import SearchForm from '../Pages/SearchForm';
import CreateServerPage from '../Pages/CreateServerPage';
import AuthPage from '../Pages/AuthPage';
import UserSetting from '../Pages/UserSetting';
import UserProfile from '../Pages/UserProfile';

function MobileRouter() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== user
  const { userIsLoading } = useSelector(store => store.user)
  // ======== user

  const { modalIsOpen } = useSelector(store => store.modal)

  // ======== autorize user
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userCollection = collection(db, 'users')
        const quer = query(userCollection, where("userGoogleId", "==", currentUser.uid));
        onSnapshot(quer, (res) => {
          res.forEach((doc) => {
            dispatch(setUser({
              ...doc.data(),
              userId: doc.id
            }))
          });
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // ======== autorize user

  // ======== check user
  React.useEffect(() => {
    if (userIsLoading) {
      navigate('/auth')
    } else {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIsLoading])
  // ======== check user

  React.useEffect(() => {
    let timer
    if (modalIsOpen) {
      timer = setTimeout(() => {
        dispatch(closeModal())
      }, 5000)
    }

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen])

  // ======== server info menu
  const [infoMenu, setInfoMenu] = React.useState(false)
  // ======== server info menu

  return (
    <div className='app'>
      {
        infoMenu &&
        <ServerInfo setInfoMenu={setInfoMenu} />
      }
      <ErrorModal />

      <Routes>
        <Route path='/home' element={<ServersList />} />
      </Routes>
      <Routes>
        <Route path='/home' element={<HomeLeftPanel />} />
        <Route path='/friends' element={<Home />} />
        {/* <Route path='/friends' element={<Friends />} /> */}
        <Route exact path='/chat/:userId' element={<ChatPage />} />
        <Route path='/server/:serverId' element={<ServerLeftPanel setInfoMenu={setInfoMenu} />} />
        <Route path='/server/:serverId/:serverName' element={<ServerPage />} />

        <Route exact path='/userSetting' element={<UserSetting />} />
        <Route exact path='/profile/:profileId' element={<UserProfile />} />

        <Route exact path='/search' element={<SearchForm />} />
        <Route exact path='/create' element={<CreateServerPage />} />
        <Route exact path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default MobileRouter