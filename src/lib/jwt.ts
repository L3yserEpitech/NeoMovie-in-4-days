import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_key';

interface User {
  id: number;
  email: string;
}

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email}, secretKey, {
    expiresIn: '30m',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log("error: ", error)
    return null;
  }
};