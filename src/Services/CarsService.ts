import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';
import CustomError from '../Utils/Error';

class CarsService {
  private ERRO_NOT_FOUND = 'Car not found';
  constructor(private ODM: CarsODM = new CarsODM()) { }
  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }
  public async registerCar(car: ICar): Promise<Car | null> {
    const carRegistered = await this.ODM.register(car);
    return this.createCarDomain(carRegistered as ICar);
  }

  public async findAllCars(): Promise<(Car | null)[]> {
    const allCars = await this.ODM.getAll();
    if (!allCars) throw new CustomError(404, this.ERRO_NOT_FOUND);
    return allCars.map((car: ICar): Car | null => this.createCarDomain(car));
  }

  public async findCarById(id: string): Promise<Car | null> {
    const carFound = await this.ODM.getById(id);
    if (!carFound) throw new CustomError(404, this.ERRO_NOT_FOUND);
    return this.createCarDomain(carFound);
  }

  public async updateById(id: string, carToUpdate: ICar): Promise<Car | null> {
    const carUpdated = await this.ODM.updateById(id, carToUpdate);
    if (!carUpdated) throw new CustomError(404, this.ERRO_NOT_FOUND);
    return this.createCarDomain(carUpdated);
  }
}

export default CarsService;
