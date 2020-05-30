export class GlobalSuccess {
  constructor(code?: number, name?: string, message?: string) {
    this.code = code || 200;
    this.name = name || "";
    this.message = message || "";
  }
  code: number;
  name: string;
  message: string;
}
