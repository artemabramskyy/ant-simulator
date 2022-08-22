const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.post('/api/behaviour', async (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(400);
    return res.send({ message: 'Missed data' });
  }

  try {
    await fs.writeFile(path.join(__dirname, `../ml-data/behaviour/behaviour.json`), JSON.stringify(data));
    res.status(200);
    res.send({ message: 'Behaviour is saved' });
  } catch (error) {
    console.error(`There is an error with behaviour saving: ${error}`);
    res.status(500);
    res.send(`There is an error with behaviour saving: ${error}`);
  }
});

app.post('/api/epoch', async (req, res) => {
  const { id, data } = req.body;

  if ((!id && id !== 0) || !data) {
    res.status(400);
    return res.send({ message: 'Missed id or data' });
  }

  try {
    await fs.writeFile(path.join(__dirname, `../ml-data/epoch/epoch-${id}.json`), JSON.stringify(data));
    res.status(200);
    res.send({ message: 'Epoch is saved' });
  } catch (error) {
    console.error(`There is an error with epoch saving: ${error}`);
    res.status(500);
    res.send(`There is an error with epoch saving: ${error}`);
  }
});

app.get('/api/epoch/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fs.readFile(path.join(__dirname, `../ml-data/epoch/epoch-${id}.json`));
    res.status(200);
    res.send({ message: 'Epoch is retrieved', data });
  } catch (error) {
    console.error(`Can't retreive the epoch-${id}: ${error}`);
    res.status(500);
    res.send(`Can't retreive the epoch-${id}: ${error}`);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log('Server is running on port:', port);
});
