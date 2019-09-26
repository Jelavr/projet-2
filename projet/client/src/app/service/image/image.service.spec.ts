import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { GameCreationMessage } from "../../../../../common/communication/messages";
import { TestHelper } from "../../../test.helper";
import { ImageService } from "./image.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpy: any;
let mockImageService: ImageService;

describe("ImageService", () => {
  httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
  mockImageService = new ImageService(httpClientSpy);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: ImageService, useValue: mockImageService },
      ],
    });

  });

  it("should be created", () => {
    const service: ImageService = TestBed.get(ImageService);
    expect(service).toBeTruthy();
  });

  it("should send the form data with a post request", () => {
    const form: FormData = new FormData();
    const expectedResponse: GameCreationMessage = {
      gameCreated: true,
      errorMessage: "This is a test.",
    };
    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    mockImageService.generateImageOfDifferences(form).subscribe(
      (response: GameCreationMessage) => {
        expect(response.gameCreated).toEqual(expectedResponse.gameCreated, "gameCreated check");
        expect(response.errorMessage).toEqual(expectedResponse.errorMessage, "errorMessage check");
      },
      fail,
    );
  });
});
