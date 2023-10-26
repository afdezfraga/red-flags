import React from "react";
import BarButton from "./BarButton";

const MainBar = ({disableConfirm, disableGoBack, handleConfirm, handleGoBack, currentTurn}) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FF4136', color: 'white', boxSizing: 'border-box', padding: '0 10px' }}>
      <BarButton disableButton={disableGoBack} handleButton={handleGoBack} text={'Go back'}/>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0' }}>Find a date for</h2>
        <h1 style={{ margin: '0' }}>{currentTurn}</h1>
        <h3 style={{ margin: '0' }}>Select your cards</h3>
      </div>
      <BarButton disableButton={disableConfirm} handleButton={handleConfirm} text={'Confirm'}/>
    </div>
  );
}

export default MainBar;