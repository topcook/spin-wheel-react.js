import React from 'react';
import ReactDOM from 'react-dom';
import Wheel from './components/wheel';
import './styles.css';

const App = () => {
  const places = ['Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas', 'Bread', 'Milk'];

  return (
    <div className="App">
      <h1>What should you eat today?</h1>
      <Wheel items={places} selectedItem={8} /> 
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
