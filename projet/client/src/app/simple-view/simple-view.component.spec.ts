import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { of } from "rxjs";
import { CheckDifferencesMessage, GameSessionCreationMessage, GameType,
  JoinGameSessionMessage, MultiEvent, MultiMessage, MultiSession} from "../../../../common/communication/messages";
import { User } from "../../../../common/communication/user";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { AppRoutingModule } from "../app-routing.module";
import { CardComponent } from "../card/card.component";
import { FreeViewComponent } from "../free-view/free-view.component";
import { EndGameModalComponent } from "../game/end-game-modal/end-game-modal.component";
import { GameComponent } from "../game/game.component";
import { InitPageComponent } from "../init-page/init-page.component";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { LobbyComponent } from "../lobby/lobby.component";
import { MessagesComponent } from "../messages/messages.component";
import { SelectionPageComponent } from "../selection-page/selection-page.component";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { UserService } from "../service/user/user.service";
import { TimerComponent } from "../timer/timer.component";
import { SimpleViewComponent } from "./simple-view.component";

const CORRECT_RESPONSE: number = 200;
const SCREEN_X: number = 800;
const SCREEN_Y: number = 600;
const CLIENT_X: number = 290;
const CLIENT_Y: number = 260;
const ONE_HUNDRED: number = 100;

class MockUserService {
  public user: User = { username: "test"};
}

let component: SimpleViewComponent;
let fixture: ComponentFixture<SimpleViewComponent>;

describe("SimpleViewComponent", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeViewComponent,
                     SelectionPageComponent,
                     CardComponent,
                     MessagesComponent,
                     InitPageComponent,
                     AdminPageComponent,
                     GameComponent,
                     SimpleViewComponent,
                     TimerComponent,
                     LobbyComponent,
                     LoadingPageComponent,
                     EndGameModalComponent],

      imports: [FormsModule,
                AppRoutingModule,
                HttpClientModule, RouterModule.forRoot([{ path: "selection", component: SelectionPageComponent }, ]) ],
      providers: [{provide: UserService, useClass: MockUserService}],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleViewComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should send position and act like a difference was found", async () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    const expectedMessage: CheckDifferencesMessage = {
      differenceFound: true,
     };
    spyOn(component, "differenceFound");
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
    const evt: MouseEvent = document.createEvent("MouseEvent");
    evt.initMouseEvent("click", true, true, window, 1, SCREEN_X, SCREEN_Y, CLIENT_X, CLIENT_Y, false, false, false, false, 0, null);
    component.coordinates(evt);
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.differenceFound).toHaveBeenCalled();

});

  it("should create all the attribute from the message from the server with ngOnInit", async () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    const expectedMessage: GameSessionCreationMessage = {
      gameSessionCreated: true,
      simpleGameSession: {
        name: "batman",
        id: "batman",
        originalImage: "batman",
        modifiedImage: "batman",
      },
      errorMessage: "attention notre mockAxios ne fonctionne pas",
    };
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
    component.ngOnInit();
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.srcModifiedImage).toEqual("batman");

});

  it("should display both of the images when the games starts", async () => {
    const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;
    component.onStartGame(true).then( (started: boolean) => {
      expect(component.start).toEqual(started);
    }).catch((error) => {
      customErrorHandler.handleError(error);
    });

});

  it("should call differencefound on gameomponent when a difference is found", () => {
  const expectedmessage: CheckDifferencesMessage = {
      differenceFound: true,
      differencesCount: 2,
    };
  spyOn(component.gameComponent, "differenceFound").and.callThrough();
  component.differenceFound(expectedmessage);
  expect(component.gameComponent.differenceFound).toHaveBeenCalled();
});

  it("should call a alert when game is not created on ngOnInit", async () => {
  let mockAxios: MockAdapter;
  mockAxios = new MockAdapter(Axios);
  const expectedMessage: GameSessionCreationMessage = {
    gameSessionCreated: false,
    errorMessage: "attention",
  };
  spyOn(window, "alert");
  mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
  component.ngOnInit();
  await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
  expect(window.alert).toHaveBeenCalledWith("There has been an error while creating game");

});

  it("the function onExitGame() will route back to the selection page", () => {
  spyOn(component.router, "navigate").and.callThrough();
  component.onExitGame(false);
  expect(component.router.navigate).toHaveBeenCalled();

});

  it("should navigate to lobby when onReplay is called and nobody is waiting", async () => {
  let mockAxios: MockAdapter;
  mockAxios = new MockAdapter(Axios);
  const expectedResponse: MultiSession[] = [
    {gameId: "test1",    gameSessionId: "test1"},
  ];
  spyOn(component.router, "navigate").and.callThrough();
  mockAxios.onGet().reply(CORRECT_RESPONSE, expectedResponse);
  component.gameID = "test2";
  component.multiSubscription = of("1").subscribe();
  component.onReplay();
  await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
  expect(component.router.navigate).toHaveBeenCalledWith(["lobby", 0, "test2"]);

});

  it("should navigate to simple-view when onReplay is called and somebody is waiting", async () => {
  let mockAxios: MockAdapter;
  mockAxios = new MockAdapter(Axios);
  const expectedResponse: MultiSession[] = [
    {gameId: "test2",    gameSessionId: "test2"},
  ];
  spyOn(component.router, "navigate").and.callThrough();
  mockAxios.onGet().reply(CORRECT_RESPONSE, expectedResponse);
  component.gameID = "test2";
  component.multiSubscription = of("1").subscribe();
  component.onReplay();
  await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
  expect(component.router.navigate).toHaveBeenCalledWith(["selection"], {skipLocationChange: true});

});

  it("joinSession should call initializeGames", async (done) => {
  const okStatus: number = 200;
  const spy: jasmine.Spy = spyOn(component, "initializeGame").and.callFake((m: GameSessionCreationMessage): void  => {
    //
  });
  const message: JoinGameSessionMessage = {    gameSessionId: "1234abcd",
                                               user: "joblo",
                                               gameType: GameType.Simple};
  const mock: MockAdapter = new MockAdapter(Axios);
  mock.onPut().reply(okStatus, message);
  component.gameID = "123";
  component["joinSession"]().then((): void => {
    setTimeout(() => {
     expect(spy).toHaveBeenCalledWith(message);
     done(); },
               ONE_HUNDRED);
  }).catch((e: Error): void => {
    throw e;
  });
  });
  it("handleMultiMessage should be able to handle a Start event correctly", () => {
  const message: MultiMessage = {
    event: MultiEvent.Start,
    player: "bruuuh",
    differenceCount: 2,
    gameId: "123",
    objectId: "myId",
    players: ["opponent"]};
  component["userService"].user.username = "brooo";
  component["handleMultiMessage"](message);
  expect(component.gameComponent.opponent).toBe("opponent");
  expect(component.gameID).toBe("123");
});

  it("handleMultiMessage should be able to handle a Difference event correctly", () => {
  const message: MultiMessage = {
    event: MultiEvent.Difference,
    player: "bruuuh",
    differenceCount: 1,
    gameId: "123",
    objectId: "myId",
    players: ["opponent"]};
  component["userService"].user.username = "brooo";
  const spy: jasmine.Spy = spyOn(component.gameComponent, "opponentDifference");
  component["handleMultiMessage"](message);

  expect(spy).toHaveBeenCalledWith(1);
});

  it("handleMultiMessage should be able to handle a Quit event correctly", () => {
  const message: MultiMessage = {
    event: MultiEvent.Quit,
    player: "bruuuh",
    differenceCount: 2,
    gameId: "123",
    objectId: "myId",
    players: ["opponent"]};
  component["userService"].user.username = "brooo";
  const spy: jasmine.Spy = spyOn(component.gameComponent, "endGame").and.callFake((): void => {
    //
  });
  component["handleMultiMessage"](message);

  expect(spy).toHaveBeenCalled();
  });
});
