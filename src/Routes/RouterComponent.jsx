import React from 'react';
import {
  Route, Routes, useNavigate
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import AddFriend from '../Pages/AddFriend';
import AuthPage from '../Pages/AuthPage';
import ChatPage from '../Pages/ChatPage';
import CreateServerPage from '../Pages/CreateServerPage';
import SearchForm from '../Pages/SearchForm';
import { ServerPage } from '../Pages/ServerPage';
import UserProfile from '../Pages/UserProfile';
import UserSetting from '../Pages/UserSetting';

import Home from '../Pages/Home';

import { ServersList } from '../Components/ServersList';

import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';
import { setUser } from '../Reducers/UserReducer';

import ErrorModal from '../Components/ErrorModal';
import { HomeLeftPanel } from '../Components/HomeLeftPanel';
import ServerInfo from '../Components/ServerInfo';
import { ServerLeftPanel } from '../Components/ServerLeftPanel';
import { closeModal } from '../Reducers/ModalReducer';

function RouterComponent() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== user
  const { user, userIsLoading } = useSelector(store => store.user)
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
    if (!user) {
      navigate('/auth')
    } else {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
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
        userIsLoading === false &&
        <ServersList />
      }
      {
        infoMenu &&
        <ServerInfo setInfoMenu={setInfoMenu} />
      }
      <ErrorModal />

      <Routes>
        <Route path='/home' element={<HomeLeftPanel />} />
        <Route path='/chat/:userId' element={<HomeLeftPanel />} />
        <Route path='/server/:serverId/:serverName' element={<ServerLeftPanel setInfoMenu={setInfoMenu} />} />
      </Routes>
      <Routes>
        <Route path='/home' element={<Home />} />

        <Route exact path='/chat/:userId' element={<ChatPage />} />

        <Route path='/server/:serverId/:serverName' element={<ServerPage />} />

        <Route exact path='/add-friend' element={<AddFriend />} />
        <Route exact path='/userSetting' element={<UserSetting />} />
        <Route exact path='/profile/:profileId' element={<UserProfile />} />

        <Route exact path='/search' element={<SearchForm />} />
        <Route exact path='/create' element={<CreateServerPage />} />
        <Route exact path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default RouterComponent