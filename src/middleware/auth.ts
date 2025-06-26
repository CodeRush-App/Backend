import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';

interface JwtPayload {
  sub: string;
  isAdmin?: boolean;
}

// Authenticate user via JWT in cookies
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token =
    req.cookies['next-auth.session-token'] || req.cookies['__Secure-next-auth.session-token'];

  if (!token) {
    res.status(401).json({ message: 'Missing authentication token' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in environment variables');
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    if (typeof decoded === 'object' && decoded.sub) {
      req.userId = decoded.sub;
      req.isAdmin = decoded.isAdmin;
    }
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Only allow admins
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAdmin) {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }
  next();
};

// Allow admins or company managers
export const authorizeCompanyManagerOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.isAdmin) {
      next();
      return;
    }
    const companyId = req.params.id || req.body.id;
    if (!companyId) {
      res.status(400).json({ message: 'Company ID required' });
      return;
    }
    const company = await prisma.companies.findUnique({ where: { id: companyId } });
    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    if (company.managedBy === req.userId) {
      next();
      return;
    }
    res.status(403).json({ message: 'Not allowed' });
  } catch (error) {
    console.error('Error during authorization:', error);
    res.status(500).json({ message: 'Error during authorization' });
  }
};

// Only allow self or admin
export const authorizeSelfOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (req.userId !== id && !req.isAdmin) {
    res.status(403).json({ message: 'Not allowed' });
    return;
  }
  next();
};
