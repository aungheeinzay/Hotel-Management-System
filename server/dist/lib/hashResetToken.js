import crypto from "crypto";
export default function (token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
