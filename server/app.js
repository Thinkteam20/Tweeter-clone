import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { db, sequelize } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// router
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

// Covering Error Case
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

sequelize.sync().then((client) => {
    const server = app.listen(config.host.port);
    initSocket(server);
});
