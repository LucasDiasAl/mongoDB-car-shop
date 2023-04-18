import { Router } from 'express';
import carRouter from './CarRoutes';

const router = Router();

router.use('/cars', carRouter);

export default router;
