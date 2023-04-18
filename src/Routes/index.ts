import { Router } from 'express';
import carRouter from './CarRoutes';
import motoRouter from './Motorcycle';

const router = Router();

router.use('/cars', carRouter);
router.use('/motorcycles', motoRouter);

export default router;
