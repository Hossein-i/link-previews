import { LPError, LPErrorType } from './errors';

export class UnknownAction extends LPError {
  static type = LPErrorType.UnknownAction;
}
