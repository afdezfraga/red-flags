import React from 'react';
import Card from './Card';
import SectionTitle from './SectionTitle';

const FinishTurn = ({ selectedCards, selectedRedFlags}) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, margin: "20px 0 50px 0"}}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
        <SectionTitle title={'Your selected perks'}/>
        {selectedCards.map((perk) => (
          <Card key={perk} text={perk} selectedCards={selectedCards} setSelectedCards={() => {}} backColor={'#4A5240'}/>
        ))}
        <SectionTitle title={'Your selected red flag'}/>
        {selectedRedFlags.map((redFlag) => (
          <Card key={redFlag} text={redFlag} selectedCards={selectedRedFlags} setSelectedCards={() => {}} maxCardsSelected={1} backColor={'#4A5240'}/>
        ))}
      </div>
    </div>
  );
};

export default FinishTurn;