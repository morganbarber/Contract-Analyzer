const express = require('express');
const fs = require('fs');
const analyzeContract = require('./api/analyze.js');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  fs.readFile('html/app.html', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading app.html');
      console.log(err)
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/analyze', async (req, res) => {
  try {
    const contractText = req.body.contractText;
    const summary = await analyzeContract(contractText);
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error in analyzing contract:', error);
    res.status(500).json({ error: 'Error in analyzing contract' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
