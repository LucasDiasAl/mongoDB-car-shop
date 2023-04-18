import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

const carController = new CarController();

router.post('/', carController.create);

export default router;