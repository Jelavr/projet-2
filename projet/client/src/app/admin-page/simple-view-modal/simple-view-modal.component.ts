import { Component, } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef} from "@angular/material";
import imageNames from "../../../../../common/communication/imagesName";
import { GameCreationMessage } from "../../../../../common/communication/messages";
import { MAX_CHARACTER,  MIN_CHARACTER, } from "../../constantes";
import { ImageService } from "../../service/image/image.service";
import { SocketService } from "../../service/socket/socket.service";
import {UserService} from "../../service/user/user.service";
import {ValidatorsService} from "../../service/validator/validators.service";

@Component({
  selector: "app-simple-view-modal",
  templateUrl: "./simple-view-modal.component.html",
  styleUrls: ["./simple-view-modal.component.css"],
})

export class SimpleViewModalComponent {

  public simpleViewModalForm: FormGroup;
  public nameInput: string;
  private form: FormData;

  public constructor(
    public dialogRef: MatDialogRef<SimpleViewModalComponent>,
    private socketService: SocketService,
    private imageService: ImageService,
    public userService: UserService,
    public validatorService: ValidatorsService) {
      this.nameInput = "";
      this.form = new FormData();
      this.simpleViewModalForm = new FormGroup({
        gameName: new FormControl("", [Validators.required, this.validatorService.checkNameValidator(MIN_CHARACTER, MAX_CHARACTER)]),
        originalFileName: new FormControl("", [Validators.required, ]),
        modifiedFileName: new FormControl("", [Validators.required, ]),
      });
     }

  public generateImageOfDifferences(event: Event): void {
    if (!this.simpleViewModalForm.invalid) {
      this.updateImageName();
      this.imageService.generateImageOfDifferences(this.form).subscribe((response: GameCreationMessage) => {
          alert(response.gameCreated ? "Le jeu a bien été créé!" : response.errorMessage);
          if (response.gameCreated) {
            this.socketService.getGames();
          }
      });
      this.onNoClick();
    }}

  public getErrorMessage(controlName: string, errorName: string, message: string): string {

    if (this.simpleViewModalForm.get(controlName) != null) {
      const check: AbstractControl = this.simpleViewModalForm.get(controlName) as AbstractControl;

      return check.hasError(errorName) ? message : "";
    }

    return "";
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  private updateImageName(): void {
    if (this.form.get(imageNames.name) !== null) {
      this.form.set(imageNames.name, this.simpleViewModalForm.controls.gameName.value);
    } else {
      this.form.append(imageNames.name, this.simpleViewModalForm.controls.gameName.value);
    }
  }

  public originalImageChanged(event: Event): void {
    if (event.target !== null) {
      this.updateImage(((event.target as HTMLInputElement).files as FileList)[0] as File, imageNames.originalName);
    }
  }

  public modifiedImageChanged(event: Event): void {
    if (event.target !== null) {
      this.updateImage(((event.target as HTMLInputElement).files as FileList)[0] as File, imageNames.modifiedName);
    }
  }

  public updateImage(file: File, imageName: string): void {
    const image: File = file;
    if (this.form.get(imageName) === undefined) {
      this.form.append(imageName, image, image.name);
    } else {
      this.form.set(imageName, image, image.name);
    }
    }
}
