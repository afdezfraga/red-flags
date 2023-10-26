import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shuffleArray, shuffleAndAppendUsedCards, PERKS_DECK, RED_FLAGS_DECK, PERKS_PER_TURN, RED_FLAGS_PER_TURN } from '../utils/DeckUtils';
import MainBar from './MainBar';
import {GameState} from './GameState';
import StartGame from './StartGame';
import SelectPerks from './SelectPerks';
import SelectRedFlags from './SelectRedFlags';
import FinishTurn from './FinishTurn';

const removeTopCards = (deck, n, type, seed) => {
  if (type !== PERKS_DECK && type !== RED_FLAGS_DECK) {
    throw new Error(`Invalid type: ${type}`);
  }
  if (n < 0) {
    throw new Error(`Invalid number of cards to remove: ${n}`);
  }
  const tmpDeck = deck[type].length < n ? shuffleAndAppendUsedCards(deck, type, seed) : {...deck};
  const cards = tmpDeck[type].slice(0, n);
  const newDeck = { ...tmpDeck, [type]: tmpDeck[type].slice(n) };
  return {cards, newDeck};
};

const Game = () => {

  const location = useLocation();
  const { players, deck: prevDeck, seed } = location.state;
  const shuffledPlayers = shuffleArray([...players].sort(), seed);

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedRedFlags, setSelectedRedFlags] = useState([]);
  const [localPlayer, setLocalPlayer] = useState(players[0]);
  const [playersOrder, setPlayersOrder] = useState(shuffledPlayers);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [deck, setDeck] = useState(prevDeck);

  const [perks, setPerks] = useState([]);
  const [redFlags, setRedFlags] = useState([]);
  const [gameState, setGameState] = useState(GameState.START);

  const givePlayerInitialHand = (initialDeck) => {
    try {
      const {cards: newPerks, newDeck} = removeTopCards(initialDeck, 5, PERKS_DECK, seed);
      const {cards: newRedFlags, newDeck: finalDeck} = removeTopCards(newDeck, 3, RED_FLAGS_DECK, seed);
      return {newPerks, newRedFlags, finalDeck};
    } catch (e) {
      return {newPerks: [], newRedFlags: [], finalDeck: initialDeck};
    }
    return {newPerks: [], newRedFlags: [], finalDeck: initialDeck};    
  };

  const refillPlayersCards = (initialDeck) => {
    try {
      const {cards: newPerks, newDeck} = removeTopCards(initialDeck, PERKS_PER_TURN, PERKS_DECK, seed);
      const {cards: newRedFlags, newDeck: finalDeck} = removeTopCards(newDeck, RED_FLAGS_PER_TURN, RED_FLAGS_DECK, seed);
      return {newPerks, newRedFlags, finalDeck};
    } catch (e) {
      return {newPerks: [], newRedFlags: [], finalDeck: initialDeck};
    }
    return {newPerks: [], newRedFlags: [], finalDeck: initialDeck};
    
  }

  const onStartGameTMP = () => {
    let currentDeck = {...deck};
    playersOrder.forEach((player) => {
      const {newPerks, newRedFlags, finalDeck} = givePlayerInitialHand(currentDeck);
      if (player === localPlayer) {
        setPerks(newPerks);
        setRedFlags(newRedFlags);
        currentDeck = finalDeck;
      } else {
        currentDeck = { 
          ...finalDeck, 
          [`used${PERKS_DECK.charAt(0).toUpperCase() + PERKS_DECK.slice(1)}`]: [...finalDeck[`used${PERKS_DECK.charAt(0).toUpperCase() + PERKS_DECK.slice(1)}`], ...newPerks], 
          [`used${RED_FLAGS_DECK.charAt(0).toUpperCase() + RED_FLAGS_DECK.slice(1)}`]: [...finalDeck[`used${RED_FLAGS_DECK.charAt(0).toUpperCase() + RED_FLAGS_DECK.slice(1)}`], ...newRedFlags]
        };
      }
    });
    console.log(currentDeck);
    console.log(playersOrder);
    setDeck(currentDeck);

    if (playersOrder[currentTurn % playersOrder.length] === localPlayer) {
      setGameState(GameState.OWN_TURN);
    } else {
      setGameState(GameState.PICK_PERKS);
    }
  };

  const onConfirmPerksTMP = () => {
    console.log(selectedCards);
    setGameState(GameState.PICK_RED_FLAGS);
  }

  const onConfirmRedFlagsTMP = () => {
    console.log(selectedRedFlags);
    setGameState(GameState.FINISH);
  }

  const onConfirmFinishTMP = () => {
    console.log('finish');
    // Remove selected perks and red flags from perks and redFlags
    const remainingPerks = perks.filter((perk) => !selectedCards.includes(perk));
    const remainingRedFlags = redFlags.filter((redFlag) => !selectedRedFlags.includes(redFlag));

    // Refill all players cards
    let currentDeck = {...deck};
    playersOrder.forEach((player, idx, arr) => {
      // If player own turn, no need to refill
      if (idx === currentTurn % arr.length) {
        return;
      }

      // Refill player cards
      const {newPerks, newRedFlags, finalDeck} = refillPlayersCards(currentDeck);
      if (player === localPlayer) {
        setPerks([...remainingPerks, ...newPerks]);
        setRedFlags([...remainingRedFlags, ...newRedFlags]);
        currentDeck = finalDeck;
      } else {
        currentDeck = { 
          ...finalDeck, 
          [`used${PERKS_DECK.charAt(0).toUpperCase() + PERKS_DECK.slice(1)}`]: [...finalDeck[`used${PERKS_DECK.charAt(0).toUpperCase() + PERKS_DECK.slice(1)}`], ...newPerks], 
          [`used${RED_FLAGS_DECK.charAt(0).toUpperCase() + RED_FLAGS_DECK.slice(1)}`]: [...finalDeck[`used${RED_FLAGS_DECK.charAt(0).toUpperCase() + RED_FLAGS_DECK.slice(1)}`], ...newRedFlags]
        };
      }
    });
    console.log(currentDeck);
    setDeck(currentDeck);

    // Reset selected perks and redFlags to empty
    setSelectedCards([]);
    setSelectedRedFlags([]);

    // Move to next turn
    const nextTurn = currentTurn + 1;
    setCurrentTurn(nextTurn);

    // If it is your turn set gameState to OWN_TURN
    // If it is not your turn set gameState to PICK_PERKS
    if (playersOrder[nextTurn % playersOrder.length] === localPlayer) {
      setGameState(GameState.OWN_TURN);
    } else {
      setGameState(GameState.PICK_PERKS);
    }
  }

  const onConfirmOwnTurnTMP = () => {
    console.log('own turn');
    const nextTurn = currentTurn + 1;
    setCurrentTurn(nextTurn);
    setGameState(GameState.PICK_PERKS);
  }

  const isDisabledConfirm = (gameState) => {
    if (gameState === GameState.START) {
      return true;
    }
    if (gameState === GameState.PICK_PERKS) {
      return selectedCards.length !== 2;
    }
    if (gameState === GameState.PICK_RED_FLAGS) {
      return selectedRedFlags.length !== 1;
    }
    if (gameState === GameState.OWN_TURN) {
      return false;
    }
    if (gameState === GameState.FINISH) {
      return false;
    }
    return true;
  }

  const isDisabledGoBack = (gameState) => {
    return (gameState === GameState.START || gameState === GameState.OWN_TURN || gameState === GameState.PICK_PERKS);
  }

  const getHandleConfirm = (gameState) => {
    if (gameState === GameState.START) {
      return () => {};
    }
    if (gameState === GameState.PICK_PERKS) {
      return onConfirmPerksTMP;
    }
    if (gameState === GameState.PICK_RED_FLAGS) {
      return onConfirmRedFlagsTMP;
    }
    if (gameState === GameState.OWN_TURN) {
      return onConfirmOwnTurnTMP;
    }
    if (gameState === GameState.FINISH) {
      return onConfirmFinishTMP;
    }
    return () => {};
  }

  const getHandleGoBack = (gameState) => {
    if (gameState === GameState.PICK_RED_FLAGS) {
      return () => setGameState(GameState.PICK_PERKS);
    }
    if (gameState === GameState.FINISH) {
      return () => setGameState(GameState.PICK_RED_FLAGS);
    }
    return () => {};
  }

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <MainBar disableConfirm={isDisabledConfirm(gameState)} disableGoBack={isDisabledGoBack(gameState)} handleConfirm={getHandleConfirm(gameState)} handleGoBack={getHandleGoBack(gameState)} currentTurn={playersOrder[currentTurn % playersOrder.length]}/>
      {gameState === GameState.START && <StartGame onStartGame={onStartGameTMP}/>}
      {gameState === GameState.PICK_PERKS && <SelectPerks perks={perks} selectedCards={selectedCards} setSelectedCards={setSelectedCards}/>}
      {gameState === GameState.PICK_RED_FLAGS && <SelectRedFlags selectedCards={selectedCards} redFlags={redFlags} selectedRedFlags={selectedRedFlags} setSelectedRedFlags={setSelectedRedFlags}/>}
      {gameState === GameState.OWN_TURN && <div style={{display: 'flex', flex: 1}}>Own turn</div>}
      {gameState === GameState.FINISH && <FinishTurn selectedCards={selectedCards} selectedRedFlags={selectedRedFlags}/>}
    </div>
  );
};

export default Game;