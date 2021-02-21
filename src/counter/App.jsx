import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState(false);

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <div
        data-test="error-message"
        className={`error ${!error && 'hidden'}`}
      >
        The counter cannot go below 0
      </div>
      <button
        type="button"
        data-test="increment-button"
        onClick={() => {
          if (error) setError(false);
          setCount(count + 1);
        }}
      >
        Increment counter
      </button>
      <button
        type="button"
        data-test="decrement-button"
        onClick={() => {
          if (count > 0) {
            setCount(count - 1);
            return;
          }
          setError(true);
        }}
      >
        Decrement counter
      </button>
    </div>
  );
}

export default App;
