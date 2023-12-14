import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { IUser } from '@models/User.model';
import ErrorResponse from '@utils/responses/ErrorResponse';


const generateToken = (user: IUser | null, options?: { expiresIn?: string }) => {
  const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY!;

  // Default options
  const defaultOptions: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  // Merge default options with provided options
  const mergedOptions = Object.assign({}, defaultOptions, options);

  // Create data object using user info (or otherwise will be undefined keys when null)
  const data = {
    userid: user?._id,
    username: user?.username,
    role: user?.role,
  }

  return jwt.sign(data, SECRET_KEY, mergedOptions);
};

const verifyToken = (token: string) => {
  try {
    const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY!;
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new ErrorResponse(401, "invalid token");
  }
};

export {
  generateToken,
  verifyToken
}