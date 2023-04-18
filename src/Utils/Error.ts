export default class CustomError extends Error {
  constructor(readonly type: number, message: string) {
    super(message);
  }
}