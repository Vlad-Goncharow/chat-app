import React from 'react';

import s from './CreateChat.module.scss';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

import { db, storage } from '../../firebaseConfig';

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { openModal } from '../../Reducers/ModalReducer';

import Upload from '../../assets/img/Upload.svg';

function CreateServerPage() {
  // ======== dispatch
  const dispatch = useDispatch()
  // ======== dispatch
  
  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== user
  const { user } = useSelector(store => store.user)
  // ======== user

  // ======== upload image
  const [image, setImage] = React.useState(null);
  // ======== upload image

  // ======== server name input
  const [serverName, setChatName] = React.useState('')
  console.log(serverName);
  function onChangeChatName(e) {
    setChatName(e.target.value)
  }
  // ======== server name input

  // ======== create server
  async function createChat(e) {
    e.preventDefault()
    const id = uuidv4()
    if (serverName.length > 0) {
      try {
        const storageRef = ref(storage, `chatImages/${id}-${image.name}`);
        let q = await uploadBytes(storageRef, image)
        let url = await getDownloadURL(ref(storage, q.ref.fullPath))
        let server = await addDoc(collection(db, "servers"), {
          serverOwner: user.userEmail,
          serverOwnerGoogleId: user.userGoogleId,
          serverName: serverName,
          serverSearchId: id.slice(0, 8),
          serverImageUrl: url,
          serverImageName: q.ref.fullPath,
          serverChatsList: []
        })
        // ======== add serverId to user array servers
        const userRef = doc(db, 'users', user.userId)
        await updateDoc(userRef, {
          serversList: arrayUnion(id.slice(0, 8)),
        })
        // ======== add serverId to user array servers

        // ======== in new server put current user
        await addDoc(collection(db, `servers/${server.id}/serverUsers`), user)
        // ======== in new server put current user

        // ======== list text servers in server
        const washingtonRef = doc(db, "servers", server.id);
        await updateDoc(washingtonRef, {
          serverChatsList: arrayUnion('general'),
        })
        navigate('/home')
        // ======== in new server put text chat(general)
      } catch (e) {
        dispatch(openModal('При создании сервера произошла ошибка!'))
      }
    } else {
      dispatch(openModal('Введите название сервера!'))
    }
  }
  // ======== create server

  // ======== image url
  const imageRef = React.useRef()
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      if (e.target.files[0]) {
        console.log('here')
        var fr = new FileReader();
        fr.onload = function () {
          imageRef.current.src = fr.result
        }
        fr.readAsDataURL(e.target.files[0]);
      }
    }
  };
  // ======== image url

  //back
  const back = () => {
    navigate(-1)
  }
  //back

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <header className="header">
          <h1 className={s.title}>Персонализируйте свой сервер</h1>
          <p className={s.descr}>Персонализируйте свой сервер, выбрав ему название и значок. Их можно будет изменить в любой момент</p>
        </header>
        <div className={s.upload}>
          <input onChange={handleChange} type="file" className={s.upload_file} />
          <div className={s.upload_item}>
            {
              image !== null ?
                <img ref={imageRef} alt="" />
                :
                <div className={s.upload_img}>
                  <img src={Upload} alt="" />
                  <span>UPLOAD</span>
                </div>
            }
          </div>
        </div>
        <form action="" className={s.form}>
          <div className={s.form_item}>
            <label htmlFor="name">НАЗВАНИЕ СЕРВЕРА</label>
            <input onChange={onChangeChatName} id='name' type="text" placeholder={`Сервер ${user?.userEmail}`} />
          </div>
          <div className={s.form_buttons}>
            <div onClick={back} className={s.back}>На главную</div>
            <button onClick={createChat} className={s.create}>Создать</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateServerPage