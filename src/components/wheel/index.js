import React, { useState, useEffect } from 'react';
import './index.css';

const Wheel = (props) => {
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rotationCount, setRotationCount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  let durationPerOneRotation = 3


  useEffect(() => {
    setItems(props.items)
    props.selectedItem && setSelectedItem(props.selectedItem);
    console.log("props.selectedItem: ", props.selectedItem);
  }, [props.items]);

  const handleLottery = async () => {
    try {
      setIsProcessing(true)
      let _selectedItem = Math.floor(Math.random() * items?.length);
      if (selectedItem === null) {
        setSelectedItem(_selectedItem);
      } else {
        setSelectedItem(null);

        setTimeout(() => {
          _selectedItem = 0
          setSelectedItem(_selectedItem);
        }, 500);
      }
    } catch (err) {
      console.log("err", err)
    }
  }

  const wheelVars = {
    '--nb-item': items?.length,
    '--selected-item': selectedItem,
    '--nb-turn': rotationCount,
    '--spinning-duration': `calc(${rotationCount} * ${durationPerOneRotation}s)`
  };
  const spinning = selectedItem !== null ? 'spinning' : '';

  const handleSetRotationCount = () => {
    setRotationCount(0)
    setTimeout(() => {
      setRotationCount(1)
      setSelectedItem(Math.floor(Math.random() * 8))
      setIsProcessing(false);
    }, 50)
  }

  return (
    items && items.length > 0 && (
      <>
        <button onClick={handleSetRotationCount} disabled={!isProcessing} style={{marginBottom:'15px'}}>Stop</button>
        <div className="wheel-container">
          <div className={`wheel ${spinning}`} style={wheelVars}>
            {items.map((item, index) => (
              <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleLottery()} disabled={isProcessing} style={{marginTop:'15px'}}>Spin</button>
      </>
    )
  );
}

export default Wheel;