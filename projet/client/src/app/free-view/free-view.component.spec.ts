import { HttpClientModule } from "@angular/common/http";
import {ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterModule, } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Subscription } from "rxjs";
import * as THREE from "three";
import { CheckDifferencesMessage, GameSessionCreationMessage, GameType, JoinGameSessionMessage,
  MultiEvent, MultiMessage, MultiSession } from "../../../../common/communication/messages";
import { JSON3DWrapper } from "../../../../common/communication/scene";
import { User } from "../../../../common/communication/user";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { CardComponent } from "../card/card.component";
import { GameComponent } from "../game/game.component";
import { InitPageComponent } from "../init-page/init-page.component";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { MessagesComponent } from "../messages/messages.component";
import { SelectionPageComponent } from "../selection-page/selection-page.component";
import { KeyEventsService } from "../service/key-events/key-events.service";
import { RenderService } from "../service/render/render.service";
import { UserService } from "../service/user/user.service";
import { SimpleViewComponent } from "../simple-view/simple-view.component";
import {TimerComponent} from "../timer/timer.component";
import { FreeViewComponent } from "./free-view.component";

const CORRECT_RESPONSE: number = 200;
const ONE_HUNDRED: number = 100;

class MockUserService {
  public user: User = { username: "test"};
}

let component: FreeViewComponent;
let fixture: ComponentFixture<FreeViewComponent>;
let render: RenderService;

describe("FreeViewComponent", () => {

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
                     LoadingPageComponent],
      imports: [FormsModule, HttpClientModule, RouterModule.forRoot([{ path: "selection", component: SelectionPageComponent }, ]) ],
      providers: [RenderService,
                  KeyEventsService,
                  NgbModal,
                  {provide: UserService, useClass: MockUserService}, ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeViewComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create all the attribute from the message from the server with ngOnInit", async () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);

    const expectedMessage: GameSessionCreationMessage = {
      gameSessionCreated: true,
      freeGameSession: {
        name: "batman",
        id: "batman",
        objectsOriginal: new Array<JSON3DWrapper>(),
        objectsModified: new Array<JSON3DWrapper>(),
      },
      errorMessage: "error",
    };
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
    // component.gameComponent = new GameComponent();
    render = TestBed.get(RenderService);
    spyOn(render, "initialize");
    component.ngAfterViewInit();
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(render.initialize ).toHaveBeenCalled();
});

  it("should display both of the images when the games starts", () => {
    component.onStartGame();
    expect(component.start).toBe(true);
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
  // component.gameComponent = new GameComponent;
  component.ngAfterViewInit();
  await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
  expect(window.alert).toHaveBeenCalledWith("attention");

});

  it("should call differencefound on gameomponent when a difference is found", () => {
  // component.gameComponent = new GameComponent;
  spyOn(component.gameComponent, "differenceFound");
  component.differenceFound(1);
  expect(component.gameComponent.differenceFound).toHaveBeenCalled();
  });

  it("onReplay should route the user to the correct free game", async (done) => {
     const okStatus: number = 200;
     const spy: jasmine.Spy = spyOn(component.router, "navigate");
     component.multiSubscription = new Subscription();
     spyOn(component.multiSubscription, "unsubscribe");
     const sessions: MultiSession[] = [ { gameId: "123",
                                          gameSessionId: "1234abcd" }];
     const mock: MockAdapter = new MockAdapter(Axios);
     mock.onGet().reply(okStatus, sessions);
     component.gameID = "123";
     component.onReplay();
     setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(["selection"], {skipLocationChange: true});
      done(); },
                ONE_HUNDRED);
  });

  it("mouseLeftClick should be able to checkDifference and call checkDiff of the renderService", async (done) => {
    const okStatus: number = 200;
    const event: MouseEvent = new MouseEvent("mouseclick");
    spyOn(component["renderService"], "checkDifferences").and.callFake((id: string): boolean => {
      return true;
    });
    spyOn(component["renderService"], "getObjectId").and.callFake((e: MouseEvent): string => {
      return "myid";
    });
    const diffFoundSpy: jasmine.Spy = spyOn(component, "differenceFound");
    component.gameComponent.canClick = true;
    component.gameSessionID =  "123";
    component["renderService"]["camera"] = new THREE.PerspectiveCamera();
    const checkDiffMessage: CheckDifferencesMessage
    = {    differenceFound: true,
           differencesCount: 2};
    const mock: MockAdapter = new MockAdapter(Axios);
    mock.onPut().reply(okStatus, checkDiffMessage);
    component.mouseLeftClick(event);
    setTimeout(() => {
     expect(diffFoundSpy).toHaveBeenCalled();
     done(); },
               ONE_HUNDRED);
  });

  it("mouseLeftClick should be able to checkDifference and block clicks when the player makes a mistake", async (done) => {
    const okStatus: number = 200;
    const event: MouseEvent = new MouseEvent("mouseclick");
    spyOn(component["renderService"], "checkDifferences").and.returnValue(true);
    spyOn(component["renderService"], "getObjectId").and.callFake((e: MouseEvent): string => {
      return "myid";
    });
    const spy: jasmine.Spy = spyOn(component.gameComponent, "errorClick").and.callFake((e: MouseEvent): void => {
      //
    });
    component.gameComponent.canClick = true;
    component.gameSessionID =  "123";
    component["renderService"]["camera"] = new THREE.PerspectiveCamera();
    const checkDiffMessage: CheckDifferencesMessage
    = {    differenceFound: false,
           differencesCount: 2};
    const mock: MockAdapter = new MockAdapter(Axios);
    mock.onPut().reply(okStatus, checkDiffMessage);
    component.mouseLeftClick(event);
    setTimeout(() => {
     expect(spy).toHaveBeenCalled();
     done(); },
               ONE_HUNDRED);
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
      differenceCount: 2,
      gameId: "123",
      objectId: "myId",
      players: ["opponent"]};
    component["userService"].user.username = "brooo";
    const spy: jasmine.Spy = spyOn(component["renderService"], "checkDifferences").and.callFake((id: string): boolean => {
      return false;
    });
    component["handleMultiMessage"](message);

    expect(spy).toHaveBeenCalledWith("myId");
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

  it("onReplay should route the winning player to the lobby", async (done) => {
    const okStatus: number = 200;
    const spy: jasmine.Spy = spyOn(component.router, "navigate");
    const sessions: MultiSession[] = [ ];
    const mock: MockAdapter = new MockAdapter(Axios);
    mock.onGet().reply(okStatus, sessions);
    component.multiSubscription = new Subscription();
    spyOn(component.multiSubscription, "unsubscribe");
    component.onReplay();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(["lobby", GameType.Free, component.gameID]);
      done();
    },         ONE_HUNDRED);
 });

  it("the function onExitGame() will route back to the selection page", () => {
  spyOn(component.router, "navigate").and.callThrough();
  component.onExitGame(false);
  expect(component.router.navigate).toHaveBeenCalled();
});
  it("the function onExitGame() will route back to the selection page", () => {
  const spy: jasmine.Spy = spyOn(component, "onReplay").and.callFake(() => {
    //
  });
  component.onExitGame(true);
  expect(spy).toHaveBeenCalled();
});

  it("joinSession should call initializeGames", async (done) => {
  const okStatus: number = 200;
  const spy: jasmine.Spy = spyOn(component, "initializeGame").and.callFake((m: GameSessionCreationMessage): void  => {
    //
  });
  const message: JoinGameSessionMessage = {    gameSessionId: "1234abcd",
                                               user: "joblo",
                                               gameType: GameType.Free};
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
});
