import React, { useEffect } from 'react'; // Import React and useEffect hook
import './App.css'; // Import CSS file for styling

function App() {
  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight Tracker</h1>
        <p>
          Welcome to our flight tracking website. Track the status of flights in real-time.
        </p>
        <form>
          <label htmlFor="flightNumber">Enter Flight Number:</label>
          <input type="text" id="flightNumber" name="flightNumber" />
          <button type="submit">Track Flight</button>
        </form>
        <div className="flight-status">
        </div>
        <footer>
          <p>© 2024 Flight Tracker. All rights reserved.</p>
        </footer>
      </header>
    </div>
  );
}

export default App;

