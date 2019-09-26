import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatDialog, } from "@angular/material";
import { Router, RouterModule } from "@angular/router";
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CardInfo } from "../../../../common/communication/card";
import { GameType } from "../../../../common/communication/messages";
import { CardComponent } from "../card/card.component";
import { FreeViewComponent } from "../free-view/free-view.component";
import { GameComponent } from "../game/game.component";
import { InitPageComponent } from "../init-page/init-page.component";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { MessagesComponent } from "../messages/messages.component";
import { SelectionPageComponent } from "../selection-page/selection-page.component";
import { CustomErrorHandler } from "../service/error_handling/custom-error-handler.service";
import { SimpleViewComponent } from "../simple-view/simple-view.component";
import { TimerComponent } from "../timer/timer.component";
import { AdminPageComponent } from "./admin-page.component";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";

const ONE_HUNDRED: number = 100;
const TWO_HUNDRED: number = 200;

describe("AdminPageComponent", () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  const dialogMock: {} = {
    open: () => { return; } };
  const modalMock: {} = {
    open: () => { return {
        result: Promise.resolve(true),
        componentInstance : {confirmationName : ""},
      };
      } };
  const mockRouter: {} = {
    navigate: () => {
      throw new Error;
    },
  };
  beforeEach(async(() => { void
    TestBed.configureTestingModule({
            declarations: [ SelectionPageComponent,
                            MessagesComponent,
                            CardComponent,
                            InitPageComponent,
                            AdminPageComponent,
                            GameComponent,
                            FreeViewComponent,
                            MessagesComponent,
                            SimpleViewComponent,
                            TimerComponent,
                            ConfirmationModalComponent,
                            LoadingPageComponent],
            imports: [FormsModule, HttpClientModule, RouterModule.forRoot([{ path: "selection", component: SelectionPageComponent }, ]) ],
            providers: [ CustomErrorHandler,
                         { provide: MatDialog, useValue: dialogMock },
                         { provide: NgbModal, useValue: modalMock},
                         { provide: Router, useValue: mockRouter},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be able to call openFreeView correctly", () => {
    const spy: jasmine.Spy = spyOn(component.dialog, "open").and.callThrough();
    component.openFreeView();
    expect(spy).toHaveBeenCalled();
  });

  it("should be able to call openSimpleView correctly", () => {
    const spy: jasmine.Spy = spyOn(component.dialog, "open").and.callThrough();
    component.openSimpleView();
    expect(spy).toHaveBeenCalled();
  });

  it("should call getGames after having deleted a game", async () => {
    const mockCard: CardInfo = {
      gameID: "1",
      name: "mockGame",
      gameType: GameType.Simple,
    };
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    mockAxios.onPost().reply(TWO_HUNDRED, "2");
    spyOn(component, "getGames");
    component.askToDeleteGame(mockCard);
    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.getGames).toHaveBeenCalled();

  });

  it("should ask to reset a game correctly", async () => {
    const mockCard: CardInfo = {
      gameID: "1",
      name: "mockGame",
      gameType: GameType.Simple,
    };
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    mockAxios.onPost().reply(TWO_HUNDRED, "2");
    spyOn(component, "getGames");
    component.askToResetGame(mockCard);

    await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
    expect(component.getGames).toHaveBeenCalled();

  });

  it("should alert when a game is not reset", async () => {
      const mockCard: CardInfo = {
        gameID: "1",
        name: "mockGame",
        gameType: GameType.Simple,
      };
      let mockAxios: MockAdapter;
      mockAxios = new MockAdapter(Axios);
      mockAxios.onPost().networkError();
      spyOn(window, "alert");
      component.askToResetGame(mockCard);

      await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
      expect(window.alert).toHaveBeenCalled();

    });

  it("should alert when a game is not deleted", async () => {
      const mockCard: CardInfo = {
        gameID: "1",
        name: "mockGame",
        gameType: GameType.Simple,
      };
      let mockAxios: MockAdapter;
      mockAxios = new MockAdapter(Axios);
      mockAxios.onPost().networkError();
      spyOn(window, "alert");
      component.askToDeleteGame(mockCard);

      await new Promise((resolve) => setTimeout(resolve, ONE_HUNDRED));
      expect(window.alert).toHaveBeenCalled();

    });

  it("should throw a error when the navigation fail", async () => {
      component.customErrorHandler = new CustomErrorHandler;
      expect(() => component.toSelection()).toThrowError();

    });

});
