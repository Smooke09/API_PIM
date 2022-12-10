"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./src/Config/server"));
const PORT = process.env.PORT || 3333;
server_1.default.listen(PORT, () => {
    console.log("Server is running on port 3333");
});
//# sourceMappingURL=loader.js.map