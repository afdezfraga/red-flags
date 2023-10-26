import React from 'react';
import Card from './Card';
import SectionTitle from './SectionTitle';

const SelectRedFlags = ({ selectedCards, redFlags, selectedRedFlags, setSelectedRedFlags }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, margin: "20px 0 50px 0"}}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
        <SectionTitle title={'Your selected perks'}/>
        {selectedCards.map((perk) => (
          <Card key={perk} text={perk} selectedCards={selectedCards} setSelectedCards={setSelectedRedFlags} backColor={'#4A5240'}/>
        ))}
        <SectionTitle title={'Select your red flag'}/>
        {redFlags.map((redFlag) => (
          <Card key={redFlag} text={redFlag} selectedCards={selectedRedFlags} setSelectedCards={setSelectedRedFlags} maxCardsSelected={1} backColor={'#FF4136'}/>
        ))}
      </div>
    </div>
  );
};

export default SelectRedFlags;