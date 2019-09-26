import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-alert-delete",
  templateUrl: "./alert-delete.component.html",
  styleUrls: ["./alert-delete.component.css"],
})
export class AlertDeleteComponent {

  public constructor(public modal: NgbActiveModal ) { }

}
