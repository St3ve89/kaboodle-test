import express, { Express } from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
