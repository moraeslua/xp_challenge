import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { appRoutes } from './app.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import { errorHandler } from './middlewares/error-handler';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
