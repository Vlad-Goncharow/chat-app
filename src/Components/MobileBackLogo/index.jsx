import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './MobileBackLogo.module.scss'

function MobileBackLogo() {
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }
  return (
    <div onClick={back} className={s.icon}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default MobileBackLogo