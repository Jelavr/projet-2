import Axios, {AxiosResponse} from "axios";
import * as chai from "chai";
import spies = require("chai-spies");
chai.use(spies);
import * as supertest from "supertest";
import { GameCreationMessage } from "../../../../common/communication/messages";
import { FreeViewRequest, TYPE_MODIFICATION } from "../../../../common/communication/scene";
import {Application} from "../../app";
import {container} from "../../inversify.config";
import TYPES from "../../types";

describe("gen Scene controller Tests :", () => {
    const okStatus: number = 200;
    const url: string = "/api/createScene/add";
    const content: string = "Content-Type";
    let app: Express.Application;
    const sandbox: ChaiSpies.Sandbox = chai.spy.sandbox();

    const request: FreeViewRequest = {
        name: "test",
        quantity: 40,
        modifications: [TYPE_MODIFICATION.Add],
        theme: false,
    };

    beforeEach( () => {
        sandbox.on(Axios, "post", async (): Promise<AxiosResponse<string>> => {
          return new Promise<AxiosResponse<string>>((resolve: (value: AxiosResponse<string>) => void,
                                                     reject: (reason: string) => void) => {
              resolve({data: "unBelId",
                       status: okStatus,
                       statusText: "200 OK",
                       headers: "",
                       config: {}});
           });
      });
        app = container.get<Application>(TYPES.Application).app;
      });

    afterEach( () => {
        sandbox.restore();
      });

    it("should return a success when all the params are valids.", async () => {
        return supertest(app)
        .post(url)
        .send(request)
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response ) => {
            chai.expect((response.body).gameCreated).to.deep.equal(true);
        });
    });

    it("should return a valid scene when all the parameters are invalid.", async () => {
        request.quantity = 0;

        return supertest(app)
       .post(url)
       .send(request)
       .expect(content, /json/)
       .expect(okStatus)
       .then((response: supertest.Response) => {
        chai.expect((response.body as GameCreationMessage).gameCreated).to.deep.equal(false);
       });
    });
});
