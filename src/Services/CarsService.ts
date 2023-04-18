import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';
import CustomError from '../Utils/Error';

class CarsService {
  constructor(private ODM: CarsODM = new CarsODM()) { }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async registerCar(car: ICar): Promise<Car | null> {
    const carODM = await this.ODM.register(car);
    return this.createCarDomain(carODM);
  }

  public async findAllCars() {
    const allCars = await this.ODM.getAll();
    if (!allCars) throw new CustomError(402, 'No cars found');
    return allCars.map((car: ICar): Car | null => this.createCarDomain(car));
  }

  public async findCarById(id: string) {
    const carFound = await this.ODM.getById(id);
    if (!carFound) throw new CustomError(404, 'Car not found');
    return this.createCarDomain(carFound);
  }
}

export default CarsService;
