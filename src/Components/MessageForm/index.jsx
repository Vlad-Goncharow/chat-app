import React from 'react'

import MessagePlus from '../../assets/img/MessagePlus.svg'
import MessageSend from '../../assets/img/MessageSend.svg'
import s from './MessageForm.module.scss'

import attatch from '../../assets/img/attatch.png'

function MessageForm({ func, inpRef, image, setImage }) {
  // ======== imageRef
  const imageRef = React.useRef()
  // ======== imageRef

  // ======== load image
  const handleChange = async e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUploadMenu(false)

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
  // ======== load image

  // ======== open load uploadMenu
  const [uploadMenu, setUploadMenu] = React.useState(false)
  const formRef = React.useRef(null)

  // ======== check image start drag
  React.useEffect(() => {
    document.addEventListener('dragenter', (ev) => {
      if (ev.dataTransfer.items) {
        if (ev.dataTransfer.items[0].kind === 'file') {
          setUploadMenu(true)
        }
      }
    })
    formRef.current.addEventListener('dragleave', (ev) => {
      setUploadMenu(false)
    })
  }, [image])
  // ======== check image start drag

  // ======== delete uploaded image
  const deleteImage = () => {
    setImage(null)
    imageRef.current.src = ''
  }
  // ======== delete uploaded image

  return (
    <div ref={formRef} className={s.formWrapper}>
      {
        uploadMenu &&
        <div className={s.uploadMenu}>
          <div className={s.menu_wrapper}>
            <input onChange={handleChange} type='file' />
            <img src={attatch} alt="" />
          </div>
        </div>
      }

      <form action="" className={s.form} onSubmit={func} >
        {
          image !== null &&
          <div className={s.form_top}>
            <div className={s.img}>
              <div className={s.img_wrapper}>
                <img ref={imageRef} alt="" />
              </div>
              <div className={s.img_name}>{image.name}</div>

              <div className={s.img_menu}>
                <div onClick={deleteImage} className={s.img_menuItem + ' ' + s.img_menuItem_delete}>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                    <title>bin</title>
                    <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z" />
                    <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        }
        <div className={s.form_bottom}>
          <div className={s.form_plus}>
            <input onChange={handleChange} type='file' />
            <img src={MessagePlus} alt="" />
          </div>
          <input className={s.form_input} ref={inpRef} type="text" />
          <div onClick={func} className={s.form_icon}>
            <img src={MessageSend} alt="" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default MessageForm