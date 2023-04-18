import { Router } from 'express';
import carRouter from './CarRoutes';
import ErrorHandler from '../Middlewares/ErrorHandler';

const router = Router();

router.use('/cars', carRouter);
router.use(ErrorHandler.error);

export default router;
