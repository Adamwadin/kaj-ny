import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());


app.get('/movies', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../backend/movies.json'));
});


app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
