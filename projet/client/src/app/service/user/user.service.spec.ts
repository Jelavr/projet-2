import { inject, TestBed } from "@angular/core/testing";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LoginMessage } from "../../../../../common/communication/messages";
import { MAX_CHARACTER, MIN_CHARACTER} from "../../constantes";
import { SocketService } from "../../service/socket/socket.service";
import { CustomErrorHandler } from "../error_handling/custom-error-handler.service";
import { UserService } from "./user.service";

const CORRECT_RESPONSE: number = 200;

describe("UserService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [SocketService],
    });

  });

  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it("Should refuse if message is too long", inject( [UserService], (userService: UserService) => {
    expect(userService.checkName(MIN_CHARACTER, MAX_CHARACTER, "12345678910111213")).toBe(false);
  }));

  it("Should refuse name if too short", inject( [UserService], (userService: UserService) => {
    expect(userService.checkName(MIN_CHARACTER, MAX_CHARACTER, "1")).toBe(false);
  }));

  it("Should refuse name if contains non-alphanumerical characters", inject( [UserService], (userService: UserService) => {
    expect(userService.checkName(MIN_CHARACTER, MAX_CHARACTER, "allo*")).toBe(false);
  }));

  it("Should accept names who are within the lenght parameters and only contain alphanumerical character",
     inject( [UserService], (userService: UserService) => {
    expect(userService.checkName(MIN_CHARACTER, MAX_CHARACTER, "bonjour")).toBe(true);
  }));

  it("should allow getOutputServiceText to access the outputServiceText", inject( [UserService], (userService: UserService) => {
    expect(userService.getOutputServiceText()).toEqual("");
  }));

});

let mockUserService: UserService;
let mockAxios: MockAdapter;

describe("UserService", () => {

  beforeEach(() => {
    mockUserService = new UserService();
    mockAxios = new MockAdapter(Axios);

    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    });
  });

  it("should return a true promise if a correct username is given to requestUsername", () => {
    const customErrorHandler: CustomErrorHandler = new CustomErrorHandler;
    const correctUsername: string = "julio";
    const expectedMessage: LoginMessage = {
      usernameAccepted: true,
    };
    mockAxios.onPut().reply(CORRECT_RESPONSE, expectedMessage);
    mockUserService.requestUsername(correctUsername).then((resp: boolean) => {
      expect(resp).toEqual(true);
    }).catch((error: Error) => {
      customErrorHandler.handleError(error);
   });
  });

});
