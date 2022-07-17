import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { appRoutes } from './routes/app.routes';
import { errorHandler } from './middlewares/error-handler';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('ola');

app.use(appRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('server listening on port 3000'));
