import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      backgroundColor: '#FF4136',
      color: 'white',
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: 'white',
      color: '#FF4136',
      border: 'none',
      cursor: 'pointer',
    },
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Red Flags</h1>
      <button style={styles.button} onClick={handleClick}>Start Game</button>
    </div>
  );
};

export default Home;