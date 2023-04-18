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

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allCars = await this.service.findAllCars();
      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const carFound = await this.service.findCarById(id);
      return res.status(200).json(carFound);
    } catch (error) {
      next(error);
    }
  };
}