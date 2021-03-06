"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
/**
 * Connects to our database, retrying up to five times and logging failed
 * connection attempts.
 */
const createDatabaseConnection = (configOverride = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let retries = 5;
    while (retries) {
        try {
            const config = yield typeorm_1.getConnectionOptions('default');
            // tslint:disable-next-line: prefer-object-spread
            return typeorm_1.createConnection(Object.assign({}, config, configOverride));
        }
        catch (err) {
            retries -= 1;
            console.log(`DB-Connection failed. Retries left: ${retries}.`, err);
            // wait 5 seconds
            yield new Promise((res) => setTimeout(res, 5000));
        }
    }
    throw new Error('Could not establish a database connection!');
});
exports.createDatabaseConnection = createDatabaseConnection;
//# sourceMappingURL=createDatabaseConnection.js.map