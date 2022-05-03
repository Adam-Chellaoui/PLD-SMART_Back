import crypto from "crypto";
const generateRandomNumber = () => crypto.randomBytes(3).toString("hex");
export { generateRandomNumber };
