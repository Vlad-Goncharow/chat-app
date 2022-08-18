import './Styles/App.scss';
import React from 'react'

import {BrowserRouter as Router} from "react-router-dom";
import Desktop from './Devices/Desktop';
import Mobile from './Devices/Mobile';
import useCheckMobileScreen from './Hooks/useCheckMobileScreen';

function App() {
  const isMobile = useCheckMobileScreen()
  function checkSize(){
    if (isMobile) {
      return (
        <Mobile />
      )
    } else {
      return (
        <Desktop />
      )
    }
  }
  
  return (
    <Router>
      {checkSize()}
    </Router>
  );
}

export default App;
