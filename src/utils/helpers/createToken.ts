import { sign } from "jsonwebtoken"

export const createToken = (secret: string) => (payload: any): Promise<string> =>  {
  return new Promise((resolve, reject) => {
    sign(payload, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}