import { Router } from 'express';
import CarController from '../Controllers/CarController';
import IdValidation from '../Middlewares/CarIdMiddleware';

const router = Router();

const carController = new CarController();
const idValidation = new IdValidation();

router.post('/', carController.create);
router.get('/:id', idValidation.idValidation, carController.getById);
router.get('/', carController.getAll);
router.put('/:id', idValidation.idValidation, carController.updateById);

export default router;