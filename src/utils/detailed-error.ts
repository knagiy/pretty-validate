export default class DetailedError extends Error {
  public details: Record<string, any>;

  constructor(message: string, details: object = {}) {
    super(message);
    this.details = details;
  }
}
