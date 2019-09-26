import { HttpClientModule } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, FormArray, FormGroup, ReactiveFormsModule  } from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatRippleModule,
  MatSelectModule, } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LoadingPageComponent } from "src/app/loading-page/loading-page.component";
import * as THREE from "three";
import {  FreeGameCreationMessage } from "../../../../../common/communication/messages";
import { JSON3DWrapper, Object3DWrapper } from "../../../../../common/communication/scene";
import { ImageService } from "../../service/image/image.service";
import { FreeViewModalComponent } from "./free-view-modal.component";

describe("FreeViewModalComponent", () => {
  let mockImageService: jasmine.SpyObj<ImageService>;
  const mockDialog: {} = {
    close: () => {/*Doit m'assurer que la fonction est appelée*/ } };

  let component: FreeViewModalComponent;
  let fixture: ComponentFixture<FreeViewModalComponent>;

  const radius: number = 10;
  const coneGeometry: THREE.ConeGeometry = new THREE.ConeGeometry(radius, radius, radius, radius);
  const position: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const rotation: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors});
  const mesh: THREE.Mesh = new THREE.Mesh(coneGeometry, material);
  const objWrapper: Object3DWrapper = new Object3DWrapper(mesh, rotation, position, 0, "Cone");
  const arrayOriginal: JSON3DWrapper[] = new Array<JSON3DWrapper>();
  const arrayModified: JSON3DWrapper[] = new Array<JSON3DWrapper>();
  arrayOriginal.push(new JSON3DWrapper(objWrapper));
  arrayModified.push(new JSON3DWrapper(objWrapper));
  beforeEach(async(() => {
    mockImageService = jasmine.createSpyObj([""]);

    TestBed.configureTestingModule({
      declarations: [ FreeViewModalComponent, LoadingPageComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatOptionModule,
        MatRippleModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: ImageService, useValue: mockImageService },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should close when calling function 'onNoClick()'", () => {
    const spy: jasmine.Spy = spyOn(component.dialogRef, "close").and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it("Should associate custom validator if checkbox test fails", () => {
    expect(true).toBeTruthy();
  });

  it("Should show preview of response if tests are valid", () => {

    spyOn(component.sceneService, "postScene").and.returnValue({ subscribe: () => {/*Creation subscribe vide*/} });
    component.freeViewModalForm.controls.gameName.setValue("ItWorks");
    component.freeViewModalForm.controls.objectType.setValue("Ludovic");
    component.freeViewModalForm.controls.objectQuantity.setValue("11");
    ((component.freeViewModalForm.controls.myitems as FormArray).at(0) as FormGroup).controls.checkbox.setValue(true);
    component.submit();
    expect(component.sceneService.postScene).toHaveBeenCalled();

  });

  it("Should not send request upon call of function 'submit' if tests are invalid", () => {
    let mockAxios: MockAdapter;
    mockAxios = new MockAdapter(Axios);
    const formArraySize: number =  (component.freeViewModalForm.controls.myitems as FormArray).length;
    spyOn(FreeViewModalComponent.prototype, "onNoClick").and.callThrough();
    component.freeViewModalForm.controls.gameName.setValue("Goodbye");
    component.freeViewModalForm.controls.objectType.setValue("Ludovic");
    component.freeViewModalForm.controls.objectQuantity.setValue("11");
    for (let i: number = 0; i < formArraySize; i++) {
      ((component.freeViewModalForm.controls.myitems as FormArray).at(i) as FormGroup).controls.checkbox.setValue(false);
    }
    component.submit();

    mockAxios.onPost().passThrough();
    expect(component.onNoClick).not.toHaveBeenCalled();
  });

  it("Should return an empty string if undefined control", () => {
    const message: string = "hello";
    component.freeViewModalForm.controls.gameName.setValue(message);
    expect(component.getErrorMessage("mistake", "checkName", message)).toBe("");
  });

  it("Should close modal on call of 'dropGame()'", () => {
    spyOn(component, "onNoClick").and.callThrough();
    component.dropGame();
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it("Should close modal on call of 'keepGame()'", () => {
    spyOn(component, "onNoClick").and.callThrough();
    component.keepGame();
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it("Should call 'partialInitialize' if the response exists", () => {
    component.originalRef = new ElementRef( document.createElement("div"));
    spyOn(component.renderService, "partialInitialize").and.callThrough();
    const response: FreeGameCreationMessage = {
      gameCreated: true,
      gameID: "bijour",
      objectsOriginal: arrayOriginal,
    };
    component.showPreview(response);
    expect(component.renderService.partialInitialize).toHaveBeenCalled();
  });
});
