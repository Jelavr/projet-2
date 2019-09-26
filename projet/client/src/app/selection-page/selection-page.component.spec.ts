import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { NavigationExtras, RouterModule} from "@angular/router";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Card, CardInfo } from "../../../../common/communication/card";
import { GameType, MultiSession } from "../../../../common/communication/messages";
import { User } from "../../../../common/communication/user";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { AppRoutingModule } from "../app-routing.module";
import {CardComponent} from "../card/card.component";
import { FreeViewComponent } from "../free-view/free-view.component";
import {GameComponent} from "../game/game.component";
import { InitPageComponent } from "../init-page/init-page.component";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { LobbyComponent } from "../lobby/lobby.component";
import { MessagesComponent } from "../messages/messages.component";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { UserService } from "../service/user/user.service";
import { SimpleViewComponent } from "../simple-view/simple-view.component";
import {TimerComponent} from "../timer/timer.component";
import { SelectionPageComponent } from "./selection-page.component";
class MockUserService {
  public user: User = { username: "test"};
}
const ONE_HUNDRED: number = 100;
describe("SelectionPageComponent", () => {
  let component: SelectionPageComponent;
  let fixture: ComponentFixture<SelectionPageComponent>;

  beforeEach(async(() => { void
    TestBed.configureTestingModule({
      declarations: [ SelectionPageComponent,
                      CardComponent,
                      InitPageComponent,
                      AdminPageComponent,
                      GameComponent,
                      FreeViewComponent,
                      MessagesComponent,
                      SimpleViewComponent,
                      TimerComponent,
                      LobbyComponent,
                      LoadingPageComponent],
      imports: [RouterModule, AppRoutingModule, FormsModule],
      providers: [{provide: UserService, useClass: MockUserService}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to admin if the to Admin button has been clicked", () => {
    spyOn(component.router, "navigate").and.callThrough();
    component.toAdmin();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it("should navigate to 'SimpleView' if the selected Game is the simple Game", () => {
    spyOn(component.router, "navigate").and.callThrough();
    component.clickJouer({gameID: "1", name: "batman3", gameType: GameType.Simple });
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it("should navigate to 'FreeView' if the selected Game is the free Game", () => {
    spyOn(component.router, "navigate").and.callThrough();
    component.clickJouer({gameID: "1", name: "batman3", gameType: GameType.Free });
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it("should navigate to 'lobby' if the user clicker on creer", () => {
    spyOn(component.router, "navigate").and.callThrough();
    component.clickCreer({gameID: "1", name: "batman3", gameType: GameType.Free });
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it(
    "should be able to grab the multiplayer sessions (simple) and update their joinStatus when the SocketService triggers a getGames event",
    async (done) => {
     const cards: Card[][] =
    [ [    {gameID: "123",
            gameType: GameType.Simple,
            name: "bruuuh",
            logo: "",
            solo: [],
            PVP: [],
            joining: false }],
      [] ];
     const okStatus: number = 200;
     const sessions: MultiSession[] = [ { gameId: "123",
                                          gameSessionId: "1234abcd" }];
     const mock: MockAdapter = new MockAdapter(Axios);
     mock.onGet().reply(okStatus, sessions);
     component.updateCardsStatusEvent()(cards);
     setTimeout(() => {
      expect(component.multiSessions[0].gameId).toBe(sessions[0].gameId);
      done(); },
                ONE_HUNDRED);
  });

  it(
    "should be able to grab the multiplayer sessions (free) and update their joinStatus when the SocketService triggers a getGames event",
    async (done) => {
     const cards: Card[][] =
    [ [],
      [{gameID: "123",
        gameType: GameType.Free,
        name: "bruuuh",
        logo: "",
        solo: [],
        PVP: [],
        joining: false }] ];
     const okStatus: number = 200;
     const sessions: MultiSession[] = [ { gameId: "123",
                                          gameSessionId: "1234abcd" }];
     const mock: MockAdapter = new MockAdapter(Axios);
     mock.onGet().reply(okStatus, sessions);
     component.updateCardsStatusEvent()(cards);
     setTimeout(() => {
      expect(component.multiSessions[0].gameId).toBe(sessions[0].gameId);
      done(); },
                ONE_HUNDRED);
  });

  it(
    "should navigate to the new session (free) when there is a multiplayer session already active",
    () => {
      spyOn(component.router, "navigate").and.callFake(
        async (commands: string[], extras?: NavigationExtras | undefined): Promise<boolean>  => {
          return new Promise<boolean>(
            (resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void, reject: (reason?: string) => void): void => {
              //
            });
      });
      const cardInfo: CardInfo =  { gameID: "123",
                                    name: "bruuuh",
                                    gameType: GameType.Free };
      const sessions: MultiSession[] = [ { gameId: "123",
                                           gameSessionId: "1234abcd" }];
      component.multiSessions = sessions;
      component.clickJoin(cardInfo);
      expect(component.router.navigate).toHaveBeenCalledWith(
        ["FreeView", "MultiPlayer", sessions[0].gameSessionId]);
  });

  it(
    "should navigate to the new session (simple) when there is a multiplayer session already active",
    () => {
      spyOn(component.router, "navigate").and.callFake(
        async (commands: string[], extras?: NavigationExtras | undefined): Promise<boolean>  => {
          return new Promise<boolean>(
            (resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void, reject: (reason?: string) => void): void => {
              //
            });
      });
      const cardInfo: CardInfo =  { gameID: "123",
                                    name: "bruuuh",
                                    gameType: GameType.Simple };
      const sessions: MultiSession[] = [ { gameId: "123",
                                           gameSessionId: "1234abcd" }];
      component.multiSessions = sessions;
      component.clickJoin(cardInfo);
      expect(component.router.navigate).toHaveBeenCalledWith(
        ["SimpleView", "MultiPlayer", sessions[0].gameSessionId]);
  });

  it(
    "should navigate to init when the player clicks on play and is not connected",
    () => {
      spyOn(component.router, "navigate").and.callFake(
        async (commands: string[], extras?: NavigationExtras | undefined): Promise<boolean>  => {
          return new Promise<boolean>(
            (resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void, reject: (reason?: string) => void): void => {
              //
            });
      });
      component["userService"].user.username = "";
      const cardInfo: CardInfo =  { gameID: "123",
                                    name: "bruuuh",
                                    gameType: GameType.Simple };
      const sessions: MultiSession[] = [ { gameId: "123",
                                           gameSessionId: "1234abcd" }];
      component.multiSessions = sessions;
      component.clickJouer(cardInfo);

      expect(component.router.navigate).toHaveBeenCalledWith(
        ["init"]);
      component["userService"].user.username = "test";
  });

  it(
    "should navigate to init when the player clicks on create and is not connected",
    () => {
      spyOn(component.router, "navigate").and.callFake(
        async (commands: string[], extras?: NavigationExtras | undefined): Promise<boolean>  => {
          return new Promise<boolean>(
            (resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void, reject: (reason?: string) => void): void => {
              //
            });
      });
      component["userService"].user.username = "";
      const cardInfo: CardInfo =  { gameID: "123",
                                    name: "bruuuh",
                                    gameType: GameType.Simple };
      const sessions: MultiSession[] = [ { gameId: "123",
                                           gameSessionId: "1234abcd" }];
      component.multiSessions = sessions;
      component.clickCreer(cardInfo);

      expect(component.router.navigate).toHaveBeenCalledWith(
        ["init"]);
      component["userService"].user.username = "test";
  });

  it(
    "should navigate to init when the player clicks on join and is not connected",
    () => {
      spyOn(component.router, "navigate").and.callFake(
        async (commands: string[], extras?: NavigationExtras | undefined): Promise<boolean>  => {
          return new Promise<boolean>(
            (resolve: (value?: boolean | PromiseLike<boolean> | undefined) => void, reject: (reason?: string) => void): void => {
              //
            });
      });
      component["userService"].user.username = "";
      const cardInfo: CardInfo =  { gameID: "123",
                                    name: "bruuuh",
                                    gameType: GameType.Simple };
      const sessions: MultiSession[] = [ { gameId: "123",
                                           gameSessionId: "1234abcd" }];
      component.multiSessions = sessions;
      component.clickJoin(cardInfo);

      expect(component.router.navigate).toHaveBeenCalledWith(
        ["init"]);
      component["userService"].user.username = "test";
  });

  it("throwError should be able to create a valid callback that calls the customErrorHandler with the correct parameters", () => {
    component["customErrorHandler"] = new CustomErrorHandler();
    spyOn(component["customErrorHandler"], "handleError").and.callFake((error: Error): void => {
      expect(error.message).toBe("lol");
    });
    component.throwError()(new Error("lol"));
  });

  it("refreshMultiCallBack should create a callback that correctly refreshes the games", () => {
    const cards: Card[][] =
    [ [],
      [{gameID: "123",
        gameType: GameType.Free,
        name: "bruuuh",
        logo: "",
        solo: [],
        PVP: [],
        joining: false }] ];
    const sessions: MultiSession[] = [ { gameId: "123",
                                         gameSessionId: "1234abcd" }];
    component.freeCards = cards[1];
    component.simpleCards = cards[0];
    component.refreshMultiCallback()(sessions);
    expect(component.freeCards[0].joining).toBeTruthy();
  });

});
