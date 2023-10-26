import seedrandom from 'seedrandom';

export const shuffleArray = (array, seed) => {
  const rng = seedrandom(seed);
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const shuffleAndAppendUsedCards = (deck, type, seed) => {
  const shuffledCards = shuffleArray(deck[`used${type.charAt(0).toUpperCase() + type.slice(1)}`], seed);
  const newDeck = { ...deck, [type]: [...deck[type], ...shuffledCards], [`used${type.charAt(0).toUpperCase() + type.slice(1)}`]: [] };
  return newDeck;
};

export const PERKS_PER_PLAYER = 5;
export const RED_FLAGS_PER_PLAYER = 3;
export const PERKS_PER_TURN = 2;
export const RED_FLAGS_PER_TURN = 1;
export const PERKS_DECK = 'perks';
export const RED_FLAGS_DECK = 'redFlags';