"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const db_config_1 = require("../lib/db.config");
const utils_1 = require("../utils");
class UserService {
    static userRegister(payload) {
        console.log("Args:Inside UserRegister", payload);
        const { email, password } = payload;
        return db_config_1.db.account.create({
            data: {
                id: (0, utils_1.accountIdGenerator)(),
                email: email,
                password: password,
                name: email.split('@')[0],
            },
        });
    }
    static getCases(payload) {
        console.log("Args:Inside the getCases", payload);
        return db_config_1.db.caseApplication.findMany({
            where: {
                accountId: payload.accounId
            }
        });
    }
}
exports.default = UserService;
