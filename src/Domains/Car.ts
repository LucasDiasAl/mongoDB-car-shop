import ICars from '../Interfaces/ICar';

export default class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICars) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status || false;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
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

  public getDoorsQty(): number {
    return this.doorsQty;
  }
  public setDoorsQty(newDoorsQty: number): void {
    this.doorsQty = newDoorsQty;
  }

  public getSeatQty(): number {
    return this.seatsQty;
  }
  public setSeatQty(newSeatQty: number): void {
    this.seatsQty = newSeatQty;
  }
}
