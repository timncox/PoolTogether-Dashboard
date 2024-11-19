import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [maxContribution, setMaxContribution] = useState({
    today: 0,
    thisWeek: 0,
    last90Days: 0,
  });

  useEffect(() => {
    fetch('/max-contribution')
      .then(response => response.json())
      .then(data => setMaxContribution(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PoolTogether Win Maximizer</h1>
        <div>
          <h2>Max WETH Contribution</h2>
          <p>Today: {maxContribution.today} WETH</p>
          <p>This Week: {maxContribution.thisWeek} WETH</p>
          <p>Last 90 Days: {maxContribution.last90Days} WETH</p>
        </div>
      </header>
    </div>
  );
}

export default App; 