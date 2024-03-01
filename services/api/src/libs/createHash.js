import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const createHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, SALT_ROUNDS)
      .then((response) => resolve(response))
      .catch((error) => reject(error.message));
  });
};
