import IVehicle from './IVehicle';

export enum IMotorcycleCategory {
  Street = 'Street',
  Custom = 'Custom',
  Trail = 'Trail',
}

export default interface IMotorcycle extends IVehicle {
  category: IMotorcycleCategory
  engineCapacity: number;
}