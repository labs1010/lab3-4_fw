import { strict as assert } from "assert";
import { Validation } from "../src/validation.ts";

function makeFormMock(report: boolean, onAdd?: (cls: string) => void) {
  return {
    reportValidity: () => report,
    classList: { add: (cls: string) => onAdd?.(cls) }
  } as unknown as HTMLFormElement;
}

describe("Validation", () => {
  it("returns false when form is invalid", () => {
    const form = makeFormMock(false);
    const v = Validation.getInstance();
    const res = v.validateForm(form);
    assert.equal(res, false);
  });

  it("returns true and adds 'was-validated' when form is valid", () => {
    let added = "";
    const form = makeFormMock(true, (cls) => (added = cls));
    const v = Validation.getInstance();
    const res = v.validateForm(form);
    assert.equal(res, true);
    assert.equal(added, "was-validated");
  });
});