import * as authRepository from "../data/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export async function signUp(req, res) {
    const { username, password, name, email, url } = req.body;
    const found = await authRepository.findByUsername(username);
    if (found) {
        res.status(404).json({
            message: `auth id(${username}) is already existing`,
        });
    } else {
        const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);
        const userId = await authRepository.createUser({
            username,
            password: hashed,
            name,
            email,
            url,
        });
        const token = createJwtToken(userId);
        res.status(200).json({ token, username });
    }
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await authRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid user or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid user or password" });
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
}

function createJwtToken(id) {
    console.log(config.jwt.secretKey);
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}

export async function me(req, res) {
    const user = await authRepository.findById(req.userId);
    if (!user) {
        return res.status(401).json({ message: "User are not found" });
    }
    res.status(200).json({ token: req.tocken, username: user.username });
}
