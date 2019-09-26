import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { MessagesComponent } from "./messages.component";

describe("MessagesComponent", () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
    })
    .compileComponents().catch((error) => {
      customErrorHandler.handleError(error);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should add a new paragraph item to our msgBox on call of the 'addMessage' function", () => {
    component.messageTypes["test"] = {classCSS: "testColor", text: "testText"};
    component.addMessage("test", "test");
    expect(component.msgBox.length).toEqual(1);
  });
});
