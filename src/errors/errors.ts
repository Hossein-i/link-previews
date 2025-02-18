export type LPErrorOptions = Error | Record<string, unknown>;

// eslint-disable-next-line no-shadow
export enum LPErrorType {
  UnknownAction = 'UnknownAction',
  InvalidUrl = 'InvalidUrl',
  FetchFailed = 'FetchFailed',
}

export class LPError extends Error {
  type: LPErrorType;

  kind?: 'server' | 'error';

  cause?: Record<string, unknown> & { err?: Error };

  constructor(
    message?: string | Error | LPErrorOptions,
    errorOptions?: LPErrorOptions,
  ) {
    let errorMessage: string | undefined;
    if (typeof message === 'string') {
      errorMessage = message;
    } else if (message instanceof Error) {
      errorMessage = message.message;
    }
    super(errorMessage);
    this.cause =
      message instanceof Error
        ? { err: message, ...((errorOptions as Record<string, unknown>) ?? {}) }
        : (errorOptions as Record<string, unknown>);
    this.name = this.constructor.name;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.type = (this.constructor as any).type ?? LPErrorType.UnknownAction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.kind = (this.constructor as any).kind ?? 'error';
    Error.captureStackTrace?.(this, this.constructor);
    // this.message += `${this.message ? '. ' : ''}Read more at https://errors.dev#${this.type.toLowerCase()}`;
  }
}
