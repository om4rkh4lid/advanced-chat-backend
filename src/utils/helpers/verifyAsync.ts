import { verify } from "jsonwebtoken";

export const verifyAsync = (secret: string) => async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}