import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomErrorHandler } from "src/app/service/error_handling/custom-error-handler.service";
import { ConfirmationModalComponent } from "./confirmation-modal.component";

describe("ConfirmationModalComponent", () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalComponent ],
      providers: [ NgbActiveModal],
    })
    .compileComponents().catch((error) => {
      customErrorHandler.handleError(error);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
