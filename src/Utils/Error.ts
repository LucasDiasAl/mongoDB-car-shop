export default class CustomError extends Error {
  constructor(readonly status: number, readonly message: string) {
    super();
  }
}