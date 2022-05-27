import React, { useState, useEffect } from 'react';
import './index.css';

const Wheel = (props) => {
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rotationCount, setRotationCount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previousItem, setPreviousItem] = useState(0);
  // const [reversedItems, setReversedItems] = useState();
  const [startTime, setStartTime] = useState(0);
  let durationPerOneRotation = 3; // the status depends heavily on the value of durationPerOneRotation: for example, if 20 => not correct
  let spinning = selectedItem !== null ? 'spinning' : '';



  useEffect(() => {
    setItems(props.items);
    // const reversedItems = ['Pizzas', 'Milk', 'Bread', 'Pastas', 'Japanese food', 'Soup', 'Salads', 'Sandwiches'];
    // setReversedItems(reversedItems);
  }, [props.items]);

  const handleLottery = async () => {
    setStartTime(Date.now());
    try {
      setIsProcessing(true)
      let _selectedItem = 0;
      setSelectedItem(selectedItem);

      setTimeout(() => {
        setSelectedItem(_selectedItem);
        setRotationCount(100);
      }, 500);
      // }
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

  const handleSetRotationCount = () => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    let passedItems = elapsedTime / durationPerOneRotation * 8 - Math.floor(elapsedTime / durationPerOneRotation) * 8;
    let exactPassedItems = Math.floor(passedItems);
    // if (passedItems - exactPassedItems > 0.5) exactPassedItems +=1;
    console.log("exact passed items:", exactPassedItems);
    setRotationCount(0); // stop the wheel directly
    let itemWhenClickedStopButton = 9 - exactPassedItems + previousItem;
    if (itemWhenClickedStopButton > 8) itemWhenClickedStopButton-=8;
    setSelectedItem(itemWhenClickedStopButton); // stop the wheel to default item

    // console.log("clicked Item: ", items[9 - exactPassedItems]);

    setTimeout(() => {

      setRotationCount(2);
      let selected = Math.floor(Math.random() * 8);
      setSelectedItem(selected);
      setPreviousItem(selected);
      console.log("selected item: ", items[selected]);

      setIsProcessing(false);
    }, 5)
  }

  return (
    items && items.length > 0 && (
      <>
        <div className="wheel-container">
          <div className={`wheel ${spinning}`} style={wheelVars}>
            {items.map((item, index) => (
              <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleLottery()} disabled={isProcessing} style={{ marginTop: '15px' }}>Spin</button>
        <button onClick={handleSetRotationCount} disabled={!isProcessing} style={{ marginBottom: '15px' }}>Stop</button>

      </>
    )
  );
}

export default Wheel;