import React from 'react'
import { useSelector } from 'react-redux'
import s from './ErrorModal.module.scss'

function ErrorModal() {
  // ======== modal
  const {modalText,modalIsOpen} = useSelector(store => store.modal)
  // ======== modal
  
  return (
    <div className={modalIsOpen === true ? s.modal + ' ' + s.modal_active : s.modal}>
      {modalText}
    </div>
  )
}

export default ErrorModal