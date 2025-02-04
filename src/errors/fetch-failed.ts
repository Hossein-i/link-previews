import { LPError, LPErrorType } from './errors';

export class FetchFailed extends LPError {
  static type = LPErrorType.FetchFailed;
}
