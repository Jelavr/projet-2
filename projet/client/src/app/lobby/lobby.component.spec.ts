import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { of } from "rxjs";
import { MultiCreationMessage } from "../../../../common/communication/messages";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { AppRoutingModule } from "../app-routing.module";
import { CardComponent } from "../card/card.component";
import { FreeViewComponent } from "../free-view/free-view.component";
import { GameComponent } from "../game/game.component";
import { InitPageComponent } from "../init-page/init-page.component";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { MessagesComponent } from "../messages/messages.component";
import { SelectionPageComponent } from "../selection-page/selection-page.component";
import { SocketService } from "../service/socket/socket.service";
import { UserService } from "../service/user/user.service";
import { SimpleViewComponent } from "../simple-view/simple-view.component";
import { TimerComponent } from "../timer/timer.component";
import { LobbyComponent } from "./lobby.component";

const CORRECT_RESPONSE: number = 200;
const ONE_HUNDRED: number = 100;

describe("LobbyComponent", () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

  const modalMock: {} = {
    open: () => { return {
      result: Promise.resolve(true),
      componentInstance : {confirmationName : ""},
    };
    } };

  const socketMock: {} = {
    getJoinedSession: () => { return of("1deleted");
      } };

  beforeEach(async(() => {
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
                     LoadingPageComponent],
      imports: [FormsModule,
                AppRoutingModule,
                HttpClientModule, RouterModule.forRoot([{ path: "selection", component: SelectionPageComponent }, ]) ],
      providers: [UserService,
                  { provide: NgbModal, useValue: modalMock},
                  { provide: SocketService, useValue: socketMock}, ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("the function gameDeleted() should call the function cancelGame()", async () => {
    spyOn(component, "cancelGame");
    component.gameDeleted();
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.cancelGame).toHaveBeenCalled();
  });

  it("the function ngOnInit() should call the function gameDeleted()", async () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    spyOn(component, "gameDeleted");
    const expectedMessage: MultiCreationMessage = {
      gameSessionCreated: true,
      gameSessionId: "1",
    };
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
    component.ngOnInit();
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.gameDeleted).toHaveBeenCalled();
  });

  it("the function ngOnInit() should call navigate()", async () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    spyOn(component.router, "navigate").and.callThrough();
    const expectedMessage: MultiCreationMessage = {
      gameSessionCreated: true,
      gameSessionId: "1deleted",
    };
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
    component.ngOnInit();
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it("the function cancelGame() navigate to selection", async () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    spyOn(component.router, "navigate").and.callThrough();
    mockAxios.onPut().reply(CORRECT_RESPONSE);
    component.cancelGame();
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.router.navigate).toHaveBeenCalled();
  });
});
