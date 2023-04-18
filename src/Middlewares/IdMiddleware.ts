import { NextFunction, Response, Request } from 'express';
import CustomError from '../Utils/Error';

export default class IdValidation {
  static validFormat = (id: string | number): boolean => {
    if (Number.isInteger(id)) return true;
    if (typeof id !== 'string') return false;
    const bytes12 = /^[0-9a-z]{12}$/i.test(id);
    const hex24 = /^[0-9a-f]{24}$/i.test(id);
    return bytes12 || hex24;
  };

  public idValidation = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const isValid = IdValidation.validFormat(id);
    if (!isValid) throw new CustomError(422, 'Invalid mongo id');
    next();
  };
}