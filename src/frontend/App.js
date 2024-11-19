import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [maxContributions, setMaxContributions] = useState({});

  useEffect(() => {
    fetch('/max-contribution')
      .then(response => response.json())
      .then(data => setMaxContributions(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PoolTogether Win Maximizer</h1>
        {Object.entries(maxContributions).map(([network, contribution]) => (
          <div key={network}>
            <h2>Max WETH Contribution for {network}</h2>
            <p>Today: {contribution.today} WETH</p>
            <p>This Week: {contribution.thisWeek} WETH</p>
            <p>Last 90 Days: {contribution.last90Days} WETH</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App; 