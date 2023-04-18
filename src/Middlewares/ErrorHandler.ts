import { Request, Response } from 'express';
import IError from '../Interfaces/IError';

export default class ErrorHandler {
  static error(error: IError, req: Request, res: Response) {
    return res.status(error.type || 500).json({ message: error.message });
  }
}