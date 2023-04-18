import { Request, Response, NextFunction } from 'express';
import IError from '../Interfaces/IError';

class ErrorHandler {
  static error(err: IError, _req: Request, res: Response, _next: NextFunction) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}
export default ErrorHandler;
