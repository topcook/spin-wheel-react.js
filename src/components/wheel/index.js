import React, { useState, useEffect } from 'react';
import './index.css';

const Wheel = (props) => {
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rotationCount, setRotationCount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime, setStartTime] = useState(0);
  let durationPerOneRotation = 3


  useEffect(() => {
    setItems(props.items)
    props.selectedItem && setSelectedItem(props.selectedItem);
    console.log("props.selectedItem: ", props.selectedItem);
  }, [props.items]);

  const handleLottery = async () => {
    try {
      console.log("handle lottery not passed");
      setIsProcessing(true)
      setStartTime(Date.now())
      console.log("startTime in handle lottery: ", Date.now());

      console.log("selectedItem: ", selectedItem);
      let _selectedItem = Math.floor(Math.random() * items?.length);
      if (selectedItem === null) {
        setSelectedItem(_selectedItem);
        console.log(" _selectedItem: ", _selectedItem);

      } else {
        setSelectedItem(null);

        setTimeout(() => {
          _selectedItem = 0
          setSelectedItem(_selectedItem);
          console.log("set Time out selected item: ", _selectedItem);
        }, 500);
      }

      // setIsProcessing(false)
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
    let endTime = Date.now()
    console.log("endTime: ", endTime)
    console.log("startTime: ", startTime)
    let elapsedTime = Math.floor((endTime - startTime) / 1000);
    let elapsedRotationCount = Math.floor(elapsedTime / durationPerOneRotation);
    console.log("elapsedTime: ", elapsedTime);
    console.log("elapsedRotationCount: ", elapsedRotationCount);

    setRotationCount(0)
    setTimeout(() => {
      setRotationCount(1)
      setSelectedItem(Math.floor(Math.random() * 8))
    }, 50)
  }

  return (
    items && items.length > 0 && (
      <>
        <button onClick={handleSetRotationCount}>Test</button>
        <div className="wheel-container">
          <div className={`wheel ${spinning}`} style={wheelVars}>
            {items.map((item, index) => (
              <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleLottery()} disabled={isProcessing}>Spin 0.05</button>
      </>
    )
  );
}

export default Wheel;