import { Model, Schema, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema<T>;
  protected modelName: string;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(this.modelName, this.schema);
  }
  public async register(objToAdd: T): Promise<T> {
    return this.model.create({ ...objToAdd });
  }
}

export default AbstractODM;