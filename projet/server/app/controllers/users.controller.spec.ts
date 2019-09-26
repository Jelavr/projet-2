import {expect} from "chai";
import * as supertest from "supertest";
import { LoginMessage } from "../../../common/communication/messages";
import { User } from "../../../common/communication/user";
import {Application} from "../app";
import {container} from "../inversify.config";
import TYPES from "../types";

describe("Users Controller Tests :", () => {
    const okStatus: number = 200;
    const url: string = "/users";
    const content: string = "Content-Type";
    const user: User = {username: "Ludovic"};
    let app: Express.Application;

    beforeEach(() => {
        app = container.get<Application>(TYPES.Application).app;
    });

    it("POST /add should return a playersList size of 1 on the first call. ", async () => {
        return supertest(app)
        .post(url + "/add")
        .send(user)
        .expect(content, /json/)
        .expect(okStatus)
        .then((response: supertest.Response ) => {
            expect((response.body as number)).to.deep.equal(1);
        });
    });

    it("PUT /login should accept username if valid.", async () => {
        return supertest(app)
       .put(url + "/login")
       .send({username: "Gaspar"})
       .expect(content, /json/)
       .expect(okStatus)
       .then((response: supertest.Response) => {
           expect((response.body as LoginMessage).usernameAccepted).to.deep.equal(true);
       });
    });

    it("PUT /remove should return true if the removal was succesfull", async () => {
        return supertest(app)
       .put(url + "/remove")
       .send(user)
       .expect(content, /json/)
       .expect(okStatus)
       .then((response: supertest.Response) => {
            expect((response.body as boolean)).to.deep.equal(true);
        });
    });
});
