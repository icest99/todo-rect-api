"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express")); //only work with TS
const typeorm_1 = require("typeorm");
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const tasks_router_1 = require("./src/tasks/tasks.router");
// Instantiate express
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Define server port
const port = process.env.PORT;
// Database Connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'ap-southeast.connect.psdb.cloud',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [tasks_entity_1.Task],
    synchronize: true,
    //synchronize our code's and table in database, it's okay to use in dev. not safe for big project. Because if we delete the code, our database will be remove or changes too! synchronize.
    //
});
exports.AppDataSource.initialize()
    .then(() => {
    // Start listening to the request on the defined port
    app.listen(port, () => console.log(`App listening on port ${port}...`));
}).catch((err) => {
    console.error(err);
});
app.use('/', tasks_router_1.tasksRouter);
app.get('/', function (req, res) {
    res.send('hello world');
});
