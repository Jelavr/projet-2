import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminPageComponent } from "./admin-page/admin-page.component";
import { CardComponent } from "./card/card.component";
import { FreeViewComponent } from "./free-view/free-view.component";
import { InitPageComponent } from "./init-page/init-page.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { SelectionPageComponent } from "./selection-page/selection-page.component";
import { SimpleViewComponent } from "./simple-view/simple-view.component";

const routes: Routes = [
  { path : "", redirectTo: "/init", pathMatch: "full"},
  { path: "init", component: InitPageComponent },
  { path: "admin", component: AdminPageComponent },
  { path: "selection", component: SelectionPageComponent },
  { path: "card", component: CardComponent },
  { path: "SimpleView/:type/:id", component: SimpleViewComponent, runGuardsAndResolvers: "always"},
  { path: "FreeView/:type/:id", component: FreeViewComponent},
  { path: "lobby/:type/:id", component: LobbyComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"}) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule {}
