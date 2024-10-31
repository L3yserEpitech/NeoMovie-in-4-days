import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_key';
// a modifer la secret key

export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, email: user.email}, secretKey, {
    expiresIn: '30m',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};