import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log('server listening on port 3000'));
