import { Model, Schema, UpdateQuery, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema<T>;
  protected modelName: string;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(this.modelName, this.schema);
  }
  public async register(objToAdd: T): Promise<T | null> {
    return this.model.create({ ...objToAdd });
  }

  public async getAll(): Promise<T[] | null> {
    return this.model.find();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateById(id: string, newData: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }
}

export default AbstractODM;