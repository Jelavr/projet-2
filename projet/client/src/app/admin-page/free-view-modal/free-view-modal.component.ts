import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators, } from "@angular/forms";
import { MatDialogRef} from "@angular/material";
import { CustomErrorHandler } from "src/app/service/error_handling/custom-error-handler.service";
import { Items} from "../../../../../common/communication/items";
import { FreeGameCreationConfirmation, FreeGameCreationMessage } from "../../../../../common/communication/messages";
import { MAX_CHARACTER, MAX_DIFFERENCES, MIN_CHARACTER, MIN_DIFFERENCES } from "../../constantes";
import {RenderService} from "../../service/render/render.service";
import { SceneService } from "../../service/scene/scene.service";
import {SocketService} from "../../service/socket/socket.service";
import {UserService} from "../../service/user/user.service";
import {ValidatorsService} from "../../service/validator/validators.service";

@Component({
  selector: "app-free-view-modal",
  templateUrl: "./free-view-modal.component.html",
  styleUrls: ["./free-view-modal.component.css"],
})
export class FreeViewModalComponent implements OnInit {
  @ViewChild("containerOriginal")
  public originalRef: ElementRef;

  public loading: boolean;
  public freeViewModalForm: FormGroup;
  public items: Array<Items>;
  public nameInput: string;
  public objectTypeInput: string;
  public objectQuantity: number;
  public checkboxGroup: FormArray;
  public showThumbnail: boolean;
  public thumbnail: string;
  public gameId: string;
  public customErrorHandler: CustomErrorHandler;

  public constructor(
    public dialogRef: MatDialogRef<FreeViewModalComponent>,
    private socketService: SocketService,
    public validatorService: ValidatorsService,
    public userService: UserService,
    public sceneService: SceneService,
    public renderService: RenderService,
    ) {
      this.loading = false;
      this.nameInput = "";
      this.objectTypeInput = "";
      this.objectQuantity = MIN_DIFFERENCES;
      this.showThumbnail = false;
      this.thumbnail = "";
      this.gameId = "";
      this.customErrorHandler = new CustomErrorHandler;
    }

  public ngOnInit(): void {
    this.items = [
      {key: "items1", text: "Ajout"},
      {key: "items2", text: "Suppression"},
      {key: "items3", text: "Changement de couleur"},
      ];

    const checkboxGroup: FormArray = new FormArray(this.items.map((item) => new FormGroup({
      id: new FormControl(item.key),
      text: new FormControl(item.text),
      checkbox: new FormControl(false),
    })));

    const hiddenControl: FormControl = new FormControl(this.mapItems(checkboxGroup.value), Validators.required);
    checkboxGroup.valueChanges.subscribe((v) => {
      hiddenControl.setValue(this.mapItems(v));
    });
    this.freeViewModalForm = new FormGroup({
      gameName: new FormControl("", [Validators.required, this.validatorService.checkNameValidator(MIN_CHARACTER, MAX_CHARACTER)]),
      objectType: new FormControl("", [Validators.required, ]),
      objectQuantity: new FormControl("", [Validators.required,
                                           Validators.min(MIN_DIFFERENCES),
                                           Validators.max(MAX_DIFFERENCES),
                                           this.validatorService.isNumberValdiator()]),
      myitems: checkboxGroup,
      selectedItems: hiddenControl,
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public showPreview(response: FreeGameCreationMessage): void {
    if (response.objectsOriginal) {
      this.thumbnail = this.renderService.partialInitialize(response.objectsOriginal, this.originalRef.nativeElement);
    }
  }

  public keepGame(): void {
    const msg: FreeGameCreationConfirmation = {
      createGame: true,
      gameID: this.gameId,
      thumnail: this.thumbnail,
    };
    this.sceneService.confirmScene(msg)
    .then(() => {
      this.socketService.getGames();
      this.showThumbnail = false;
    })
    .catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
    this.onNoClick();
  }

  public dropGame(): void {
    const msg: FreeGameCreationConfirmation = {
      createGame: false,
      gameID: this.gameId,
    };
    this.sceneService.confirmScene(msg).catch((error: Error) => {
      this.customErrorHandler.handleError(error);
    });
    this.showThumbnail = false;
    this.onNoClick();
  }

  public submit(): void {
    if (!this.freeViewModalForm.invalid) {
      this.nameInput = this.freeViewModalForm.controls.gameName.value;
      this.showThumbnail = true;
      this.loading = true;
      this.sceneService.postScene(this.freeViewModalForm).subscribe( (response: FreeGameCreationMessage) => {
        if (response) {
          this.gameId = response.gameID;
          this.loading = false;
          this.showPreview(response);
        }
      });
   }
  }

  public getErrorMessage(controlName: string, errorName: string, message: string): string {

    if (this.freeViewModalForm.get(controlName) != null) {
      const check: AbstractControl = this.freeViewModalForm.get(controlName) as AbstractControl;

      return check.hasError(errorName) ? message : "";
    }

    return "";

  }

  public getErrorCheckbox(errorName: string, message: string): string {
    const selected: AbstractControl = this.freeViewModalForm.controls.selectedItems;

    return selected.hasError(errorName) ? message : "";
  }

  /* tslint:disable:no-any ce sont des variable any puisque il que le .checkbox est un attribut
  d'un form group que nous avons creer plus haut */
  public mapItems(items: Array<Items>): Array<Items> | null {
    const selectedItems: Array<Items> = items.filter((item: any ) => item.checkbox).map((item: any) => item.id);

    return selectedItems.length ? selectedItems : null;
  }
}
