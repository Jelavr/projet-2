import {inject, TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { ValidatorsService } from "./validators.service";

describe("ValidatorsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ValidatorsService = TestBed.get(ValidatorsService);
    expect(service).toBeTruthy();
  });

  it("should refuse an entry for the quantity of differences if the input is a number",
     inject( [ValidatorsService], (validatorService: ValidatorsService) => {
    const formControl: FormControl = new FormControl("", [ValidatorsService.prototype.isNumberValdiator()]);
    formControl.setValue("Bonjour");
    expect(formControl.hasError("checkNumber")).toBe(true);
  }));
});
