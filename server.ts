import express, { Request, Response } from 'express';
import cors from 'cors';
import notes from './src/api/notes.route';

const app = express();

app.use(cors());
app.use(express.json());

//api
app.use('/api/v1/notes', notes);
app.use('*', (req: Request, res: Response) =>
	res.status(404).json({ error: 'not found' })
);

export default app;
