"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const node_config_1 = __importDefault(require("./node.config"));
if (!node_config_1.default || !node_config_1.default.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined. Please check your environment variables.');
}
exports.db = new client_1.PrismaClient({
    datasources: {
        db: {
            url: node_config_1.default.DATABASE_URL,
        },
    },
});
