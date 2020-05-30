export class GlobalError extends Error {
  code: number = 0;

  constructor(code?: number, name?: string, message?: string) {
    super();
    this.code = code || 0;
    this.name = name || "";
    this.message = message || "";
  }
}
