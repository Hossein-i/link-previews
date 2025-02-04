import { LPError, LPErrorType } from './errors';

export class InvalidUrl extends LPError {
  static type = LPErrorType.InvalidUrl;
}
