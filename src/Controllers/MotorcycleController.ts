import { NextFunction, Request, Response } from 'express';
import MotorcyclesService from '../Services/MotorcycleService';

export default class MotorcycleController {
  constructor(private service: MotorcyclesService = new MotorcyclesService()) {
  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const motorcycleToRegister = req.body;
      const motorcycleRegistered = await this.service.registerMotorcycle(motorcycleToRegister);
      return res.status(201).json(motorcycleRegistered);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allMotorcycles = await this.service.findAllMotorcycles();
      return res.status(200).json(allMotorcycles);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const motorcycleFound = await this.service.findMotorcycleById(id);
      return res.status(200).json(motorcycleFound);
    } catch (error) {
      next(error);
    }
  };

  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const newMotorcycleData = req.body;
      const motorcycleUpdated = await this.service.updateById(id, newMotorcycleData);
      return res.status(200).json(motorcycleUpdated);
    } catch (error) {
      next(error);
    }
  };
}