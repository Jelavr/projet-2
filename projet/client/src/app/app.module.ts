import { HttpClientModule } from "@angular/common/http";

import { ErrorHandler, NgModule, } from "@angular/core";
import { FormsModule, ReactiveFormsModule, } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule} from "@angular/router";

import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatRippleModule,
  MatSelectModule,
 } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { ConfirmationModalComponent } from "./admin-page/confirmation-modal/confirmation-modal.component";
import { FreeViewModalComponent } from "./admin-page/free-view-modal/free-view-modal.component";
import { SimpleViewModalComponent } from "./admin-page/simple-view-modal/simple-view-modal.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { FreeViewComponent } from "./free-view/free-view.component";
import { EndGameModalComponent } from "./game/end-game-modal/end-game-modal.component";
import { GameComponent } from "./game/game.component";
import { InitPageComponent} from "./init-page/init-page.component";
import { LoadingPageComponent } from "./loading-page/loading-page.component";
import { AlertDeleteComponent } from "./lobby/alert-delete/alert-delete.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { MessagesComponent } from "./messages/messages.component";
import { SelectionPageComponent } from "./selection-page/selection-page.component";
import { CustomErrorHandler } from "./service/error_handling/custom-error-handler.service";
import { ImageService } from "./service/image/image.service";
import { RenderService} from "./service/render/render.service";
import { SimpleViewComponent } from "./simple-view/simple-view.component";
import { TimerComponent } from "./timer/timer.component";

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
  ],
  declarations: [
    AppComponent,
    InitPageComponent,
    AdminPageComponent,
    SelectionPageComponent,
    SimpleViewModalComponent,
    FreeViewModalComponent,
    GameComponent,
    TimerComponent,
    SimpleViewComponent,
    FreeViewComponent,
    CardComponent,
    MessagesComponent,
    ConfirmationModalComponent,
    LoadingPageComponent,
    LobbyComponent,
    EndGameModalComponent,
    AlertDeleteComponent,
  ],

  entryComponents: [
    SimpleViewModalComponent,
    FreeViewModalComponent,
    ConfirmationModalComponent,
    EndGameModalComponent,
    AlertDeleteComponent,
  ],

  providers: [
    ImageService,
    RenderService,
///////////////////////////////////////////////
    CustomErrorHandler,
    { provide: ErrorHandler, useValue: new CustomErrorHandler },
    ],
//////////////////////////////////////////////
  bootstrap: [AppComponent],
})
export class AppModule { }
