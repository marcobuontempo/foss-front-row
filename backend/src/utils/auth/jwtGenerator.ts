import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '@models/User.model';

const generateJWT = (user: IUser) => {
    const secretKey: Secret = process.env.JWT_SECRET_KEY!;
    const data = {
        id: user._id,
        username: user.username
    }
    return jwt.sign(data, secretKey, { expiresIn: '7d', algorithm: 'HS256' });
};

export { generateJWT }