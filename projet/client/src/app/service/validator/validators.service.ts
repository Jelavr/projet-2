import { Injectable } from "@angular/core";
import {FormControl, ValidatorFn} from "@angular/forms";
import {UserService} from "../user/user.service";
@Injectable({
  providedIn: "root",
})
export class ValidatorsService {

  public constructor(private userService: UserService) { }

  public isNumberValdiator(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && isNaN(control.value)) {
            return { "checkNumber": true }; }

        return null;
    };
  }

  public checkNameValidator(min: number, max: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined &&
          ( !this.userService.checkName(min, max, control.value))) {
            return { "checkName": true }; }

        return null;
    };
  }

}
