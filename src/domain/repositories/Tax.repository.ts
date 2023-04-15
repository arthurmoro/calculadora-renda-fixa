export interface ITaxRepository {
  getIRRF(): Promise<number>;
}
