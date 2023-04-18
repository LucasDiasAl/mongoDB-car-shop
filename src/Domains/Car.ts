import ICars from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor({ id, model, year, color, status, buyValue, doorsQty, seatsQty }: ICars) {
    super({ id, model, year, color, status, buyValue });
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status || false;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
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
