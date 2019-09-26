import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { ImageService } from "../../service/image/image.service";
import { SimpleViewModalComponent } from "./simple-view-modal.component";

describe("SimpleViewComponent", () => {
  let mockImageService: jasmine.SpyObj<ImageService>;
  let component: SimpleViewModalComponent;
  let fixture: ComponentFixture<SimpleViewModalComponent>;
  const mockDialog: {} = {
    close: () => {/*Doit m'assurer que la fonction est appelée*/ } };

  beforeEach(async(() => {
    mockImageService = jasmine.createSpyObj([""]);

    TestBed.configureTestingModule({
      declarations: [ SimpleViewModalComponent ],
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
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: ImageService, useValue: mockImageService },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be able to call update image correctly", () => {
    spyOn(SimpleViewModalComponent.prototype, "updateImage").and.callThrough();
    component.updateImage(new File([], "test"), "test");
    expect(SimpleViewModalComponent.prototype.updateImage).toHaveBeenCalled();
  });

  it("should be able to call generateImageOfDifferences()", () => {
    spyOn(SimpleViewModalComponent.prototype, "generateImageOfDifferences").and.callThrough();
    component.generateImageOfDifferences(new Event("test"));
    expect(SimpleViewModalComponent.prototype.generateImageOfDifferences).toHaveBeenCalled();
  });

  it("should be able to call originalImageChanged()", () => {
    spyOn(SimpleViewModalComponent.prototype, "originalImageChanged").and.callThrough();
    component.originalImageChanged(new Event("test"));
    expect(SimpleViewModalComponent.prototype.originalImageChanged).toHaveBeenCalled();
  });

  it("should be able to call modifiedImageChanged()", () => {
    spyOn(SimpleViewModalComponent.prototype, "modifiedImageChanged").and.callThrough();
    component.modifiedImageChanged(new Event("test"));
    expect(SimpleViewModalComponent.prototype.modifiedImageChanged).toHaveBeenCalled();
  });

  it("Should return an empty string if undefined control", () => {
    const message: string = "hello";
    component.simpleViewModalForm.controls.gameName.setValue(message);
    expect(component.getErrorMessage("mistake", "checkName", message)).toBe("");
  });

  it("Should close when calling function 'onNoClick()'", () => {
    const spy: jasmine.Spy = spyOn(component.dialogRef, "close").and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

});
