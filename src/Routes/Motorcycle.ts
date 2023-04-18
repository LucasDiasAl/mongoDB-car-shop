import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import IdValidation from '../Middlewares/IdMiddleware';

const router = Router();

const motorcycleController = new MotorcycleController();
const idValidation = new IdValidation();

router.post('/', motorcycleController.create);

router.get('/:id', idValidation.idValidation, motorcycleController.getById);

router.get('/', motorcycleController.getAll);

router.put('/:id', idValidation.idValidation, motorcycleController.updateById);

export default router;