export class Validation {
  private static _instance: Validation;

  public static getInstance(): Validation {
    if (!this._instance) this._instance = new Validation();

    return this._instance;
  }

  validateForm(form: HTMLFormElement): boolean {
    if (!form.reportValidity()) {
      return false;
    }

    form.classList.add("was-validated");
    return true;
  }
}
