import React from 'react'
import useOnClickOutside from '../../Hooks/useOnClickOutside'
import s from './ImageModal.module.scss'

function ImageModal({ url, setImageIsOpen }) {
  // ======== close img modal
  const closeModal = () => {
    setImageIsOpen(false)
  }
  // ======== close img modal

  // ======== image ref
  const imageRef = React.useRef()
  // ======== image ref

  // ======== check img click
  useOnClickOutside(imageRef, () => closeModal())
  // ======== check img click

  return (
    <div className={s.wrapper}>
      <div onClick={closeModal} className={s.close}></div>
      <div ref={imageRef} className={s.image}>
        <img src={url} alt="" />
      </div>
    </div>
  )
}

export default ImageModal