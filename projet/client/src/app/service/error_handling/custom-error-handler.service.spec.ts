import { TestBed } from "@angular/core/testing";
import { CustomErrorHandler } from "./custom-error-handler.service";
import { MouseLeftClickError } from "./customErrors/mouseLeftClickError";

describe("CustomErrorHandler", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ ],
  }));

  it("should be created", () => {
    const service: CustomErrorHandler = TestBed.get(CustomErrorHandler);
    expect(service).toBeTruthy();
  });

  it("Should display the correct message at the console when called", () => {
    const spy: jasmine.Spy = spyOn(CustomErrorHandler.prototype, "handleError").and.callThrough();
    CustomErrorHandler.prototype.handleError(new MouseLeftClickError);
    expect(spy).toHaveBeenCalled();

  });
});
