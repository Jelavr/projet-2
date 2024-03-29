import { Component, Input } from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirmation-modal",
  templateUrl: "./confirmation-modal.component.html",
  styleUrls: ["./confirmation-modal.component.css"],
})
export class ConfirmationModalComponent {

  @Input()
  public confirmationName: string;

  public constructor(public modal: NgbActiveModal ) {}

}
