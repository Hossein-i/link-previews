type ErrorOptions = Error | Record<string, unknown>;

enum ErrorType {
  UnknownAction = 'UnknownAction',
  InvalidUrl = 'InvalidUrl',
  FetchFailed = 'FetchFailed',
}

export class LPError extends Error {
  type: ErrorType;
  kind?: 'server' | 'error';
  cause?: Record<string, unknown> & { err?: Error };

  constructor(
    message?: string | Error | ErrorOptions,
    errorOptions?: ErrorOptions
  ) {
    super(
      typeof message === 'string'
        ? message
        : message instanceof Error
          ? message.message
          : undefined
    );
    this.cause =
      message instanceof Error
        ? { err: message, ...((errorOptions as Record<string, unknown>) ?? {}) }
        : (errorOptions as Record<string, unknown>);
    this.name = this.constructor.name;
    this.type = (this.constructor as any).type ?? 'LPError';
    this.kind = (this.constructor as any).kind ?? 'error';
    Error.captureStackTrace?.(this, this.constructor);
    this.message += `${this.message ? '. ' : ''}Read more at https://errors.dev#${this.type.toLowerCase()}`;
  }
}

export class UnknownAction extends LPError {
  static type = ErrorType.UnknownAction;
}

export class InvalidUrl extends LPError {
  static type = ErrorType.InvalidUrl;
}

export class FetchFailed extends LPError {
  static type = ErrorType.FetchFailed;
}
