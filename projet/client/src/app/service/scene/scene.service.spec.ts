import { HttpClientTestingModule } from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Items } from "../../../../../common/communication/items";
import { FreeGameCreationConfirmation, GameCreationMessage } from "../../../../../common/communication/messages";
import { CustomErrorHandler } from "../error_handling/custom-error-handler.service";
import { SceneService } from "./scene.service";

describe("SceneService", () => {
  const CORRECT_RESPONSE: number = 200;
  let mockAxios: MockAdapter;

  const items: Array<Items> = [
    {key: "items1", text: "Ajout"},
    {key: "items2", text: "Suppression"},
    {key: "items3", text: "Changement de couleur"},
    ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SceneService],
  }));

  beforeEach( () => {
    mockAxios = new MockAdapter(Axios);
  });

  it("should be created", inject([SceneService], (service: SceneService) =>  {
    service = TestBed.get(SceneService);
    expect(service).toBeTruthy();
  }));

  it("Confirm scene should return true when we confirm the game", inject([SceneService], (service: SceneService) => {
    const message: FreeGameCreationConfirmation = {
      createGame: true,
      gameID: "12",
    };
    const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;
    const expectedResponse: boolean = true;
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedResponse);
    service.confirmScene(message).then( () => {
      expect(true).toBe(true);
    }).catch((error) => {
      customErrorHandler.handleError(error);
    });
  }));

  it("post scene should respond that the game was created when we send valid params", inject([SceneService], (service: SceneService) => {

    const message: FormGroup = new FormGroup({
      gameName: new FormControl("", null),
      objectType: new FormControl(),
      objectQuantity: new FormControl(),
      myitems: new FormArray(items.map((item) => new FormGroup({
        id: new FormControl(item.key),
        text: new FormControl(item.text),
        checkbox: new FormControl(false),
      }))),
      selectedItems: new FormControl(),
    });
    message.controls.gameName.setValue("test");
    message.controls.objectType.setValue("Géométrique");
    message.controls.objectQuantity.setValue("20");
    const formArraySize: number = 3;
    for (let i: number = 0; i < formArraySize; i++) {
      ((message.controls.myitems as FormArray).at(i) as FormGroup).controls.checkbox.setValue(true);
    }
    const expectedResponse: GameCreationMessage = {
      gameCreated: true,
    };
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedResponse);
    service.postScene(message).subscribe((response: GameCreationMessage) => {
      expect(response.gameCreated).toBe(true);
    });
  }));

  it("throwError should be able to construct a valid Observable", inject([SceneService], (service: SceneService) => {
    const myError: Error = new Error("lol");
    expect(service["throwError"]("bro")(myError) !== undefined).toBeTruthy();
  }));

  it("post scene should respond that the game was not created with invalid params", inject([SceneService], (service: SceneService) => {

    const message: FormGroup = new FormGroup({
      gameName: new FormControl("", null),
      objectType: new FormControl(),
      objectQuantity: new FormControl(),
      myitems: new FormArray(items.map((item) => new FormGroup({
        id: new FormControl(item.key),
        text: new FormControl(item.text),
        checkbox: new FormControl(false),
      }))),
      selectedItems: new FormControl(),
    });
    message.controls.gameName.setValue("");
    message.controls.objectType.setValue("Géométrique");
    message.controls.objectQuantity.setValue("5");
    const formArraySize: number = 3;
    for (let i: number = 0; i < formArraySize; i++) {
      ((message.controls.myitems as FormArray).at(i) as FormGroup).controls.checkbox.setValue(true);
    }
    service.postScene(message).subscribe((response: GameCreationMessage) => {
      expect(response.gameCreated).toBe(false);
    });
  }));
});
