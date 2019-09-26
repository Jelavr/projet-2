import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import {TimerComponent} from "../timer/timer.component";
import { GameComponent } from "./game.component";

const TIME_VALUE: number = 9000;
const ONE_SECOND: number = 6000;
const SCREEN_X: number = 800;
const SCREEN_Y: number = 600;
const CLIENT_X: number = 290;
const CLIENT_Y: number = 260;
const MAX_DIFFERENCE: number = 7;
const WIN_DIFF: number = 4;

describe("GameComponent", () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let timer: TimerComponent;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = TIME_VALUE;

  const modalMock: {} = {
    open: () => { return {
        result: Promise.resolve(true),
        componentInstance : {confirmationName : ""},
      };
      },
    };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, TimerComponent, LoadingPageComponent],
      providers: [TimerComponent, LoadingPageComponent,
                  { provide: NgbModal, useValue: modalMock}],
    })
    .compileComponents().catch((error: Error) => {
            component.customErrorHandler.handleError(error);
        });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    timer = component.timerComponent;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("#Countdown() should call startTimer()", async (done) => {
    component.countdown();
    spyOn(component, "startTimer");
    setTimeout(() => {
      expect(component.startTimer).toHaveBeenCalled();
      done(); },
               ONE_SECOND);
  });

  it("should run #startTimer()", async () => {
    spyOn(timer, "start");
    component.startTimer();
    expect(timer.start).toHaveBeenCalled();
  });

  it("should run #StopTimer()", async () => {
    spyOn(timer, "stop");
    component.start = true;
    component.stopTimer();
    expect(timer.stop).toHaveBeenCalled();
  });

  it("should increment the difference count if DifferenceFound is called", async () => {
    component.diffcounter = 0;
    component.differenceFound(1);
    expect(component.diffcounter).toEqual(1);
  });

  it("should call EndGame when the seven difference are found", async () => {
    spyOn(component, "endGame");
    component.isMulti = false;
    component.ngOnInit();
    component.differenceFound(MAX_DIFFERENCE);
    expect(component.endGame).toHaveBeenCalled();
  });

  it("should stop the user from clicking after the user click on a wrong spot", async () => {
    const evt: MouseEvent = document.createEvent("MouseEvent");
    evt.initMouseEvent("click", true, true, window, 1, SCREEN_X, SCREEN_Y, CLIENT_X, CLIENT_Y, false, false, false, false, 0, null);
    component.errorClick(evt);
    expect(component.canClick).toEqual(false);
  });

  it("should alert the parent if the user click on exit game", async () => {
    spyOn(component.exitgame, "emit");
    component.exit();
    expect(component.exitgame.emit).toHaveBeenCalledWith(false);
  });

  it("should alert the parent if the user click on replay game", async () => {
    spyOn(component.exitgame, "emit");
    component.replay();
    expect(component.exitgame.emit).toHaveBeenCalledWith(true);
  });

  it("the function opponentDifference() should call the function endGame() is oppenent reaches the correct amout of diff", () => {
    spyOn(component, "endGame");
    component.ngOnInit();
    component.maxDiff = WIN_DIFF;
    component.opponentDifference(WIN_DIFF);
    expect(component.endGame).toHaveBeenCalled();

  });
});
