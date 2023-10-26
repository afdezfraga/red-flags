import React from 'react';

const StartGame = ({ onStartGame }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <button onClick={onStartGame}style={{ backgroundColor: '#FF4136', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', fontWeight: 'bold', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)', transition: 'all 0.2s ease-in-out' }}>Start Game</button>
    </div>
  );
};

export default StartGame;