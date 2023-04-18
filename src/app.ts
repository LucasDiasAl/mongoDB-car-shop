import express from 'express';
import router from './Routes';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use(router);
app.use(ErrorHandler.error);

export default app;
