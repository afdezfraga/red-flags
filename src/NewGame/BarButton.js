import React from 'react';

const BarButton = ({ disableButton, handleButton, text }) => {

  return (
    <div>
      <button 
        disabled={disableButton} 
        onClick={handleButton}
        style={{ backgroundColor: 
          disableButton ? '#CCCCCC' : 'white', 
                    color: disableButton ? '#666666' : '#FF4136', 
                    border: 'none', 
                    borderRadius: '5px', 
                    padding: '10px 10px', 
                    fontWeight: 'bold', 
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)', 
                    transition: 'all 0.2s ease-in-out' }
        }>
          {text}
        </button>
    </div>
  );
}

export default BarButton;