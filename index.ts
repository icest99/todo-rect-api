import dotenv from "dotenv";
import cors from 'cors'
import bodyParser from "body-parser";
import express, { Express } from "express"; //only work with TS
import {DataSource} from 'typeorm';
import { Task } from "./src/tasks/tasks.entity";
import { tasksRouter } from "./src/tasks/tasks.router";

// Instantiate express
const app: Express = express()
dotenv.config()

app.use(bodyParser.json());
app.use(cors());

// Define server port
const port = process.env.PORT;

// Database Connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'ap-southeast.connect.psdb.cloud',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true,
    //synchronize our code's and table in database, it's okay to use in dev. not safe for big project. Because if we delete the code, our database will be remove or changes too! synchronize.
    //
})

AppDataSource.initialize()
    .then(() => {
        // Start listening to the request on the defined port
        app.listen(port, () => console.log(`App listening on port ${port}...`));
    }).catch((err) => {
        console.error(err)
    });

app.use('/', tasksRouter)
app.get('/test', function (req, res) {
    res.send('hello world')
  })