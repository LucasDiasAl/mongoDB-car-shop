import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcycleODM';
import CustomError from '../Utils/Error';

class MotorcyclesService {
  constructor(private ODM: MotorcyclesODM = new MotorcyclesODM()) { }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async registerMotorcycle(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleRegistered = await this.ODM.register(motorcycle);
    return this.createMotorcycleDomain(motorcycleRegistered);
  }

  public async findAllMotorcycles(): Promise<(Motorcycle | null)[]> {
    const allMotorcycles = await this.ODM.getAll();
    if (!allMotorcycles) throw new CustomError(402, 'No motorcycles found');
    return allMotorcycles
      .map((motorcycle: IMotorcycle): Motorcycle | null => this.createMotorcycleDomain(motorcycle));
  }

  public async findMotorcycleById(id: string): Promise<Motorcycle | null> {
    const motorcycleFound = await this.ODM.getById(id);
    if (!motorcycleFound) throw new CustomError(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycleFound);
  }

  public async updateById(id: string, motorcycleToUpdate: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleUpdated = await this.ODM.updateById(id, motorcycleToUpdate);
    if (!motorcycleUpdated) throw new CustomError(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycleUpdated);
  }
}

export default MotorcyclesService;