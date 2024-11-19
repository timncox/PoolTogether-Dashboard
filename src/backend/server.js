const express = require('express');
const { Alchemy, Network } = require('alchemy-sdk');

const app = express();
const port = 3000;

const settings = {
  apiKey: 'YOUR_ALCHEMY_API_KEY',
  network: Network.ETH_MAINNET, // Change to the appropriate network
};

const alchemy = new Alchemy(settings);

app.get('/max-contribution', async (req, res) => {
  // Fetch and process data from Alchemy
  // Example: Fetch transactions and calculate max WETH contribution
  const maxContribution = await getMaxContribution();
  res.json(maxContribution);
});

async function getMaxContribution() {
  // Example logic to fetch transactions and calculate max WETH contribution
  const transactions = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toBlock: 'latest',
    contractAddresses: ['SMART_CONTRACT_ADDRESS'],
    category: ['external'],
  });

  // Filter and calculate max contributions for each time frame
  const maxToday = calculateMax(transactions, 'today');
  const maxThisWeek = calculateMax(transactions, 'thisWeek');
  const maxLast90Days = calculateMax(transactions, 'last90Days');

  return {
    today: maxToday,
    thisWeek: maxThisWeek,
    last90Days: maxLast90Days,
  };
}

function calculateMax(transactions, timeFrame) {
  // Implement logic to filter transactions by timeFrame and calculate max WETH
  return 0; // Placeholder
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 