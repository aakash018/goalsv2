import jwt from "jsonwebtoken";

export const createRefToken = (data: string | number) => {
  try {
    return jwt.sign({ userID: data }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createAuthToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: "15m",
  });
};
