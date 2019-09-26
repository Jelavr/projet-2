import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { TimerComponent } from "./timer.component";

describe("TimerComponent", () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  const THOUSAND: number = 1000;
  const TWO: number = 2;
  const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
    })
    .compileComponents().catch((error) => {
      customErrorHandler.handleError(error);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("makes sure that the timer funtion is working correctly by calling the start timer function", async() => {
    component.start();
    jasmine.clock().tick(THOUSAND);
    component.stop();
    expect(component.time).toEqual(TWO);
  });
});
