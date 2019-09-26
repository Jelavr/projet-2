import { expect } from "chai";
import "reflect-metadata";
import { User } from "../../../../common/communication/user";
import { container } from "../../inversify.config";
import TYPES from "../../types";
import { UsersService } from "./users.service";

describe("User service test :", () => {
    let userService: UsersService;
    beforeEach(() => {
        userService = container.get<UsersService>(TYPES.UsersService);
});

    it("should be able to add an user", () => {
        expect(userService.addUser({username: "gorgie"})).to.be.greaterThan(0);
    });

    it("should be able to remove a user", () => {
        const lengthB4delete: number = userService["users"].length;
        userService.removeUser({username: "gorgie"});
        expect(userService["users"].length).to.equal(lengthB4delete - 1);
    });

    it("should refuse username that are too long", () => {
        const username: string = "abcdefghijklmopooooo";
        expect(userService.checkUsername(username).usernameAccepted).to.equal(false);
    });

    it("should refuse names that contains special characters", () => {
        const username: string = "**&###";
        expect(userService.checkUsername(username).usernameAccepted).to.equal(false);
    });

    it ("should refuse username that are too small", () => {
        const username: string = "ab";
        expect(userService.checkUsername(username).usernameAccepted).to.equal(false);
    });

    it ("should refuse the username if it is already used.", () => {
        const user: User = {username: "gorgie"};
        const username: string = "gorgie";
        userService.addUser(user);
        expect(userService.checkUsername(username).usernameAccepted).to.equal(false);
    });

    after( () => { process.exit(); });
    it("should accept user name that are correct length and alphanumeric.", () => {
        const username: string = "gorgies";
        expect(userService.checkUsername(username).usernameAccepted).to.equal(true);
    });

    it("should be able to find a user", () => {
         const username: string = "gorgie";
         expect(userService.findIdxByUsername(username)).to.equal(0);
    });

    it("should correctly handle it when the user is not found", () => {
        const username: string = "gorgiess";
        expect(userService.findIdxByUsername(username)).to.equal(-1);
    });

    it("should do nothing when the username is not found while deleting", () => {
        const lengthB4delete: number = userService["users"].length;
        const user: User = {username: "gorgiess"};
        userService.removeUser(user);
        expect(userService["users"].length).to.equal(lengthB4delete);
    });

});
