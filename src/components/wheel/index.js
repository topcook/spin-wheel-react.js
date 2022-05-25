import React, { useState, useEffect } from 'react';
import './index.css';

const Wheel = (props) => {
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setItems(props.items)
    props.selectedItem && setSelectedItem(props.selectedItem);
  }, [props.items]);

  const selectItem = () => {
    const _selectedItem = Math.floor(Math.random() * items?.length);
    if (selectedItem === null) {
      setSelectedItem(_selectedItem);
      console.log(" selected item: ", _selectedItem);

    } else {
      setSelectedItem(null);

      setTimeout(() => {
        setSelectedItem(_selectedItem);
        console.log("set Time out selected item: ", _selectedItem);
      }, 500);
    }
  }

  const wheelVars = {
    '--nb-item': items?.length,
    '--selected-item': selectedItem,
  };
  const spinning = selectedItem !== null ? 'spinning' : '';

  return (
    items && items.length > 0 && (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={() => selectItem()}>
          {items.map((item, index) => (
            <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Wheel;