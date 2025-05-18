import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/start', async (req, res) => {
  try {
    await execAsync('docker run  --network host amazon-crawler:latest');
    res.json({ status: 'success', message: 'Crawler started successfully' });
  } catch (error) {
    console.error('Error starting crawler:', error);
    res.status(500).json({ status: 'error', message: 'Failed to start crawler' });
  }
});

app.post('/stop', async (req, res) => {
  try {
    await execAsync('docker stop amazon-crawler');
    res.json({ status: 'success', message: 'Crawler stopped successfully' });
  } catch (error) {
    console.error('Error stopping crawler:', error);
    res.status(500).json({ status: 'error', message: 'Failed to stop crawler' });
  }
});

app.listen(port, () => {
  console.log(`SDK Platform listening at http://localhost:${port}/start`);
}); 