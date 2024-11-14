import { Response, NextFunction } from 'express';
import { AppDataSource } from '../db/connection';
import { User } from '../entities/User';
import { ImageRequest } from '../controllers/images';
import { verifyToken } from '../auth';

export const authMiddleware = async (req: ImageRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authorization token required' });
    return;
  }

  try {
    const decoded:any = verifyToken(token);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: decoded.userId });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
