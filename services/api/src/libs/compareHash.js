import * as bcrypt from "bcrypt";

export const compareHash = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hashedPassword)
      .then((match) => resolve(match))
      .catch((error) => reject(error));
  });
};
