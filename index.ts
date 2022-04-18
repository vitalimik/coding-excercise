import express from 'express';
import cors from 'cors';
import path from 'path';
import storage from 'node-persist';
import { SCORE_SUM, RUNS_COUNT } from './constants';

interface InitState {
  result?: number | null;
}

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('./client/build'));

app.use(express.json());
app.use(cors());

const storageInit = async () => {
  await storage.init();
}

storageInit();

app.post('/api/avg-score', async (req, res) => {
  const initState: InitState = {
    result: undefined,
  };

  if (req.body) {
    let scoreSum = await storage.getItem(SCORE_SUM) ?? 0;
    let runsCount = await storage.getItem(RUNS_COUNT) ?? 0;
    if (typeof req.body.newScore === 'number') {
      scoreSum += req.body.newScore;
      runsCount += 1;
    }
    await storage.setItem(SCORE_SUM, scoreSum);
    await storage.setItem(RUNS_COUNT, runsCount);

    initState.result = Math.round(scoreSum / runsCount);
  }
  res.json(initState.result);
  res.end();
});

app.get('/api/init-avg-score', async (req, res) => {
  const initState: InitState = {
    result: undefined,
  };
  let scoreSum = await storage.getItem(SCORE_SUM);
  let runsCount = await storage.getItem(RUNS_COUNT);
  initState.result = typeof scoreSum === 'number' ? Math.round(scoreSum / runsCount) : null;
  res.json(initState.result);
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(
    __dirname, 'client', 'build', 'index.html'
  ));
  res.end();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
