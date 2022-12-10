"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(code, msg) {
        this.message = msg;
        this.code = code;
    }
    // -- Error Message --
    static badRequest(msg) {
        return new Error(400, msg);
    }
    static notFound(msg) {
        return new Error(404, msg);
    }
    static forbidden(msg) {
        return new Error(403, msg);
    }
    static notAcceptable(msg) {
        return new Error(406, msg);
    }
    static unauthorize(msg) {
        return new Error(401, msg);
    }
}
exports.Error = Error;
//# sourceMappingURL=error.js.map