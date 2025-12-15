import { config } from "dotenv";
config()
import jwt from "jsonwebtoken"
const jwtService = {
    createAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {expiresIn: "1d"}),
    parseAccessToken: (token) => jwt.verify(token, process.env.ACCESS_TOKEN_KEY),
    createRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {expiresIn: "30d"}),
    parseRefreshToken: (token) => jwt.verify(token, process.env.REFRESH_TOKEN_KEY),
    refreshTokenOptions: {
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        httpOnly: true, 
        secure: process.env.NODE_ENV == "production", 
        sameSite: 'strict',
    },
    roles: {is_admin: false, is_super: false},
};

export default jwtService;

