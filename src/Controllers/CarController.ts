import { NextFunction, Request, Response } from 'express';
import CarsService from '../Services/CarsService';

export default class CarController {
  constructor(private service: CarsService = new CarsService()) {
  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carToRegister = req.body;
      const carResgistered = await this.service.registerCar(carToRegister);
      return res.status(201).json(carResgistered);
    } catch (error) {
      next(error);
    }
  };
}