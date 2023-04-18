import IVehicle from '../Interfaces/IVehicle';

export default abstract class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status || false;
    this.buyValue = vehicle.buyValue;
  }

  public getId(): string | undefined {
    return this.id;
  }
  public setId(newId: string): void {
    this.id = newId;
  }

  public getModel(): string {
    return this.model;
  }
  public setModel(newModel: string): void {
    this.model = newModel;
  }

  public getYear(): number {
    return this.year;
  }
  public setYear(newYear: number): void {
    this.year = newYear;
  }

  public getColor(): string {
    return this.color;
  }
  public setColor(newColor: string): void {
    this.color = newColor;
  }

  public getStatus(): boolean {
    return this.status;
  }
  public setStatus(newStatus: boolean): void {
    this.status = newStatus;
  }

  public getBuyValue(): number {
    return this.buyValue;
  }
  public setBuyValue(newBuyValue: number): void {
    this.buyValue = newBuyValue;
  }
}
