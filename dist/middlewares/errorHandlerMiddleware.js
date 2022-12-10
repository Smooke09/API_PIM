"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(error);
    if (error) {
        return res.status(error.code).json(error.message);
    }
    return res.status(500).json({ message: "Internal Server Error" });
};
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map