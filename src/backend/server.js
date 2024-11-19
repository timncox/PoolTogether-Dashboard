const express = require('express');
const { Alchemy, Network } = require('alchemy-sdk');

const app = express();
const port = 3000;

const networks = [
  { name: 'Ethereum Mainnet', network: Network.ETH_MAINNET },
  { name: 'Optimism', network: Network.OPTIMISM },
  { name: 'Base', network: Network.BASE },
  { name: 'Arbitrum', network: Network.ARBITRUM },
  { name: 'World', network: Network.WORLD },
  { name: 'Scroll', network: Network.SCROLL },
];

app.get('/max-contribution', async (req, res) => {
  // Fetch and process data from Alchemy
  // Example: Fetch transactions and calculate max WETH contribution
  const maxContribution = await getMaxContribution();
  res.json(maxContribution);
});

async function getMaxContribution() {
  const contributions = {};

  const networkConfigs = [
    { name: 'Ethereum Mainnet', network: Network.ETH_MAINNET, contractAddress: 'ETHEREUM_CONTRACT_ADDRESS' },
    { name: 'Optimism', network: Network.OPTIMISM, contractAddress: 'OPTIMISM_CONTRACT_ADDRESS' },
    { name: 'Base', network: Network.BASE, contractAddress: 'BASE_CONTRACT_ADDRESS' },
    { name: 'Arbitrum', network: Network.ARBITRUM, contractAddress: 'ARBITRUM_CONTRACT_ADDRESS' },
    { name: 'World', network: Network.WORLD, contractAddress: 'WORLD_CONTRACT_ADDRESS' },
    { name: 'Scroll', network: Network.SCROLL, contractAddress: 'SCROLL_CONTRACT_ADDRESS' },
  ];

  for (const { name, network, contractAddress } of networkConfigs) {
    const alchemy = new Alchemy({ apiKey: process.env.ALCHEMY_API_KEY, network });
    const transactions = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      contractAddresses: [contractAddress],
      category: ['external'],
    });

    contributions[name] = {
      today: calculateMax(transactions, 'today'),
      thisWeek: calculateMax(transactions, 'thisWeek'),
      last90Days: calculateMax(transactions, 'last90Days'),
    };
  }

  return contributions;
}

function calculateMax(transactions, timeFrame) {
  // Implement logic to filter transactions by timeFrame and calculate max WETH
  return 0; // Placeholder
}
