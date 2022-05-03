const generateRandomNumber = () => crypto.randomBytes(3).toString("hex");
export{generateRandomNumber};