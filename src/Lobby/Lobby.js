import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shuffleArray, PERKS_DECK, RED_FLAGS_DECK } from '../utils/DeckUtils';

const Lobby = () => {
  const [playerNames, setPlayerNames] = useState(['', '', '']);
  const [deck, setDeck] = useState('default');
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000) + 1);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (playerNames.length < 10) {
      setPlayerNames((prevPlayerNames) => [...prevPlayerNames, '']);
    }
  };

  const handleRemovePlayer = (index) => {
    if (playerNames.length > 3) {
      setPlayerNames((prevPlayerNames) => prevPlayerNames.filter((_, i) => i !== index));
    }
  };

  const handlePlayerNameChange = (event, index) => {
    const value = event.target.value;
    setPlayerNames((prevPlayerNames) => {
      const newPlayerNames = [...prevPlayerNames];
      newPlayerNames[index] = value;
      return newPlayerNames;
    });
  };

  const handleDeckChange = (event) => {
    const value = event.target.value;
    setDeck(value);
  };

  const handleSeedChange = (event) => {
    const value = parseInt(event.target.value);
    setSeed(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedNames = playerNames.map((name) => name.trim());
    const hasEmptyNames = trimmedNames.some((name) => name === '');
    setPlayerNames(trimmedNames);
    if (hasEmptyNames) {
      setErrorMessage('Player names cannot be empty.');
      return;
    }
    const hasDuplicateNames = trimmedNames.some((name, index) => trimmedNames.indexOf(name) !== index);
    if (hasDuplicateNames) {
      setErrorMessage('Player names must be unique.');
      return;
    }
    fetch(`/decks/${deck}.json`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((response) => response.json())
      .then((data) => {
        const shuffledPerks = shuffleArray(data.perks, seed);
        const shuffledRedFlags = shuffleArray(data.red_flags, seed);
        navigate('/play', {
          state: {
            players: trimmedNames,
            deck: {[PERKS_DECK]: shuffledPerks, [RED_FLAGS_DECK]: shuffledRedFlags, usedPerks: [], usedRedFlags: []},
            seed,
          },
        });
      })
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '100dvh',
      backgroundColor: '#FF4136',
      color: 'white',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      marginTop: '20px',
      marginBottom: '20px',
      marginRight: '20px',
      marginLeft: '20px',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      marginBottom: '10px',
      marginTop: '10px',
      marginRight: '10px',
    },
    label: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      marginTop: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      color: 'black',
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      marginBottom: '10px',
      
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: '#FF4136',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    wheel: {
      fontSize: '36px',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: 'black',
      backgroundColor: '#FFDC00',
    },
    playerList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    playerListItem: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid black',
    },
    playerListButton: {
      padding: '5px 10px',
      borderRadius: '5px',
      backgroundColor: '#FF4136',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '10px',
      marginRight: '10px',
      alignSelf: 'center',
    },
    playerListAddButton: {
      padding: '5px 10px',
      borderRadius: '5px',
      backgroundColor: '#FF4136',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '20px',
      alignSelf: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Create game</h1>
      <div style={styles.form}>
        <div style={styles.playerList}>
          {playerNames.map((name, index) => (
            <div key={index} style={styles.playerListItem}>
              <label style={styles.label}>{index ? `Player ${index + 1} name:` : `Your name:` }</label>
              <input style={styles.input} type="text" value={name} placeholder="Player Name" onChange={(event) => handlePlayerNameChange(event, index)} />
              {playerNames.length > 3 && (<div style={styles.playerListButton} onClick={() => handleRemovePlayer(index)}>-</div>)}
            </div>
          ))}
        </div>
        {playerNames.length < 10 && (
              <div style={styles.playerListAddButton} onClick={handleAddPlayer}>+</div>
          )}
        <div>
          <label style={styles.label} htmlFor="deck">Deck:</label>
          <select style={styles.select} id="deck" name="deck" value={deck} onChange={handleDeckChange}>
            <option value="default">Default</option>
          </select>
        </div>
        <div>
          <label style={styles.label} htmlFor="seed">Seed:</label>
          <input style={styles.input} type="number" id="seed" name="seed" value={seed} onChange={handleSeedChange} />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button style={styles.button} onClick={handleSubmit}>Start Game</button>
      </div>
    </div>
  );
};

export default Lobby;