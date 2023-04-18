import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

class CarsService {
  constructor(private ODM: CarsODM = new CarsODM()) { }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async registerCar(car: ICar) {
    const carODM = await this.ODM.register(car);
    return this.createCarDomain(carODM);
  }
}

export default CarsService;
