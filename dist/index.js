"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //only work with TS
// Instantiate express
const app = (0, express_1.default)();
// Define server port
const port = process.env.PORT || 5000;
// Create a default route
app.get('/', (req, res) => {
    res.send(`TS-Express app is listening on port ${port}`);
});
// Start listening to the request on the defined port
app.listen(port);
