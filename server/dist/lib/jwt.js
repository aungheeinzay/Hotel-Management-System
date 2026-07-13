import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
});
export const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
    return token;
};
export const decodedToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};
