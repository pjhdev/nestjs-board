import { InternalErrorCode } from './internal-error-code.enum';

export class CustomException extends Error {
  errorCode: InternalErrorCode;
  errorMessage?: string;

  constructor(partial: Partial<CustomException>) {
    super();
    Object.assign(this, partial);
  }

  getErrorCode() {
    return this.errorCode;
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
