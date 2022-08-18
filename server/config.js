import dotenv from "dotenv";
dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
};

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresIn: required("JWT_EXPIRES_IN", "2d"),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("POST", 8080)),
  },
};
