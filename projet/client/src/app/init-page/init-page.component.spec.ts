import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { AppRoutingModule } from "../app-routing.module";
import {CardComponent} from "../card/card.component";
import { FreeViewComponent } from "../free-view/free-view.component";
import {GameComponent} from "../game/game.component";
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { LobbyComponent } from "../lobby/lobby.component";
import { MessagesComponent } from "../messages/messages.component";
import { SelectionPageComponent } from "../selection-page/selection-page.component";
import { UserService } from "../service/user/user.service";
import { SimpleViewComponent } from "../simple-view/simple-view.component";
import {TimerComponent} from "../timer/timer.component";
import { InitPageComponent } from "./init-page.component";

describe("InitPageComponent", () => {
  let component: InitPageComponent;
  let fixture: ComponentFixture<InitPageComponent>;
  const name: string = "gorgie";

  beforeEach(async(() => { void
    TestBed.configureTestingModule({
      declarations: [ InitPageComponent,
                      AdminPageComponent,
                      SelectionPageComponent,
                      CardComponent,
                      GameComponent,
                      TimerComponent,
                      SimpleViewComponent,
                      MessagesComponent,
                      FreeViewComponent,
                      LobbyComponent,
                      LoadingPageComponent],
      imports: [FormsModule, HttpClientModule, RouterModule, AppRoutingModule],
      providers: [UserService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be able to call requestCreaterUser() correctly", () => {
    component.nameInput = name;
    component.requestCreateUser();
    expect(component.outputText.length).toBeGreaterThan(0);
  });

});
