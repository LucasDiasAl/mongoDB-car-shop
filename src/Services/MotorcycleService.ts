import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcycleODM';
import CustomError from '../Utils/Error';

class MotorcyclesService {
  private ERRO_MESSAGE_NOT_FOUND = 'Motorcycle not found';

  constructor(private ODM: MotorcyclesODM = new MotorcyclesODM()) { }

  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async registerMotorcycle(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleRegistered = await this.ODM.register(motorcycle);
    return this.createMotorcycleDomain(motorcycleRegistered as IMotorcycle);
  }

  public async findAllMotorcycles(): Promise<(Motorcycle)[]> {
    const allMotorcycles = await this.ODM.getAll();
    if (!allMotorcycles) throw new CustomError(404, this.ERRO_MESSAGE_NOT_FOUND);
    return allMotorcycles
      .map((motorcycle: IMotorcycle): Motorcycle => this.createMotorcycleDomain(motorcycle));
  }

  public async findMotorcycleById(id: string): Promise<Motorcycle> {
    const motorcycleFound = await this.ODM.getById(id);
    if (!motorcycleFound) throw new CustomError(404, this.ERRO_MESSAGE_NOT_FOUND);
    return this.createMotorcycleDomain(motorcycleFound);
  }

  public async updateById(id: string, motorcycleToUpdate: IMotorcycle): Promise<Motorcycle> {
    const motorcycleUpdated = await this.ODM.updateById(id, motorcycleToUpdate);
    if (!motorcycleUpdated) throw new CustomError(404, this.ERRO_MESSAGE_NOT_FOUND);
    return this.createMotorcycleDomain(motorcycleUpdated);
  }
}

export default MotorcyclesService;