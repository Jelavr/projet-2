import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import Axios from "axios";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API, BASE_SERVER_URL, CREATE_SCENE } from "src/app/constantes";
import { FreeGameCreationConfirmation, GameCreationMessage } from "../../../../../common/communication/messages";
import { FreeViewRequest, TYPE_MODIFICATION} from "../../../../../common/communication/scene";

import { CustomErrorHandler } from "../error_handling/custom-error-handler.service";
@Injectable({
  providedIn: "root",
})
export class SceneService {

  public customErrorHandler: CustomErrorHandler;
  private readonly BASE_URL: string;
  private readonly NB_TYPE_MODIF: number = 3;

  public constructor(private http: HttpClient) {
    this.BASE_URL = BASE_SERVER_URL + API + CREATE_SCENE;
  }

  public postScene(info: FormGroup): Observable<GameCreationMessage> {
    const modifications: TYPE_MODIFICATION[] = new Array();
    for (let i: number = 0; i < this.NB_TYPE_MODIF; i++) {
      const boxCheckedAtPositionI: boolean = ((info.controls.myitems as FormArray).at(i) as FormGroup).controls.checkbox.value;
      if (boxCheckedAtPositionI) {
        modifications.push(i);
      }
    }
    const request: FreeViewRequest = {
      name: info.controls.gameName.value,
      quantity: info.controls.objectQuantity.value,
      modifications: modifications,
      theme: info.controls.objectType.value === "Thème",
    };

    return this.http.post<GameCreationMessage>(this.BASE_URL + "add", request).pipe(
    catchError(this.handleError<GameCreationMessage>("generateImageOfDifferences")));
  }

  public async confirmScene(msg: FreeGameCreationConfirmation): Promise<void> {
    await Axios.put(this.BASE_URL + "confirm", msg);
  }

  private throwError<T>(result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return this.throwError<T>(result);
  }
}
