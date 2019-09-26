import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { LoadingPageComponent } from "./loading-page.component";

describe("LoadingPageComponent", () => {
  let component: LoadingPageComponent;
  let fixture: ComponentFixture<LoadingPageComponent>;
  const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPageComponent ],
    })
    .compileComponents().catch((error) => {
      customErrorHandler.handleError(error);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

});
