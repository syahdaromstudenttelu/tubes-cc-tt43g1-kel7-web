export default class RegisterError extends Error {
  constructor(message: string, cause: string) {
    super(message, { cause });
  }
}
