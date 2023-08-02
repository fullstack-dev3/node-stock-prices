const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const { symbol } = req.query;
    
    if (!symbol) {
      return res.status(400).json({ error: 'symbol parameter is required. Ex: symbol=AAPL' });
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      symbol,
      currentPrice: data.chart.result[0].meta.regularMarketPrice,
      exchangeName: data.chart.result[0].meta.exchangeName,
      high: data.chart.result[0].indicators.quote[0].high,
      low: data.chart.result[0].indicators.quote[0].low,
      open: data.chart.result[0].indicators.quote[0].open,
      close: data.chart.result[0].indicators.quote[0].close
    });
  } catch (error) {
    console.error('Error fetching stock price:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock price' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});