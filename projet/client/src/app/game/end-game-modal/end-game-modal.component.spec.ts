import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EndGameModalComponent } from "./end-game-modal.component";

describe("EndGameModalComponent", () => {
  let component: EndGameModalComponent;
  let fixture: ComponentFixture<EndGameModalComponent>;

  beforeEach(async(() => { void
    TestBed.configureTestingModule({
      declarations: [ EndGameModalComponent ],
      providers: [ NgbActiveModal],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("the source image should be equal to IMG_WIN if the player has won the game", () => {
    component.wingame = true;
    component.ngOnInit();
    expect(component.srcImg).toEqual("../../../assets/ezclap.gif");

  });

  it("the source image should be equal to IMG_LOST  if the player has lost the game", () => {
    component.wingame = false;
    component.ngOnInit();
    expect(component.srcImg).toEqual("../../../assets/sadpepe.gif");

  });

});
