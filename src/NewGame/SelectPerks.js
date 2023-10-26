import React from 'react';
import Card from './Card';

const SelectPerks = ({ perks, selectedCards, setSelectedCards }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flex: 1, margin: '50px 0' }}>
        {perks.map((perk) => (
          <Card key={perk} text={perk} selectedCards={selectedCards} setSelectedCards={setSelectedCards} maxCardsSelected={2} backColor={'#FF4136'}/>
        ))}
    </div>
  );
};

export default SelectPerks;