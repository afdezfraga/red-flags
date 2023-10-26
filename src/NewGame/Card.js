import React from 'react';

const Card = ({ text, selectedCards, setSelectedCards, maxCardsSelected, backColor }) => {

  const handleClick = () => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(text)) {
        return prevSelectedCards.filter((cardText) => cardText !== text);
      } else if (prevSelectedCards.length === maxCardsSelected) {
        return [...prevSelectedCards.slice(1), text];
      } else {
        return [...prevSelectedCards, text];
      }
    });
  };

  const isSelected = selectedCards.includes(text);

  return (
    <div
      style={{
        backgroundColor: isSelected ? backColor : 'white',
        color: isSelected ? 'white' : 'black',
        borderRadius: '5px',
        padding: '10px',
        width: '80%',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.2s ease-in-out',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        border: isSelected ? '2px solid'.concat(backColor) : '2px solid black',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <p>{text}</p>
    </div>
  );
};

export default Card;