import jwt from "jsonwebtoken";

export const createRefToken = (data: string | number) => {
  try {
    return jwt.sign({ userID: data }, process.env.JWT_KEY, {
      expiresIn: "15m",
    });
  } catch (e) {
    console.log(e);
    return "dfsdf";
  }
};

export const createAuthToken = (data: string) => {
  return jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: 60 * 60 * 15, // 15 min
  });
};
