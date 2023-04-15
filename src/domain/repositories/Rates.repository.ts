export interface IRatesRepository {
  getSelic(): Promise<number>;
  getIPCA(): Promise<number>;
  getCDI(): Promise<number>;
  getPoupanca(): Promise<number>;
  getTR(): Promise<number>;
  getDolar(): Promise<number>;
  getIBOV(): Promise<number>;
}
