import React from 'react';
import ReactDOM from 'react-dom';
import Wheel from './components/wheel';
import './styles.css';

const App = () => {
  const places = ['Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas', 'Bread', 'Milk'];
  // const places = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className="App">
      <h1>What should you eat today?</h1>
      <Wheel items={places} selectedItem={8} /> 
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
