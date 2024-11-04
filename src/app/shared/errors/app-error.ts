import {AuthError} from "../api/models/response/auth-error";

export class AppError {
  originalError: any;
  errorMessage: string;

  constructor(originalError: any, errorMessage: string | AuthError) {
    this.originalError = originalError;
    if (typeof errorMessage === 'string') {
      this.errorMessage = errorMessage;
    }
    else {
      this.errorMessage = errorMessage.error;
    }
  }
}
