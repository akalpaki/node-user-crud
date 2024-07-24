import jwt, { JwtPayload } from 'jsonwebtoken';
import { ServerConfig } from '../../config/config.js';
import { NextFunction, Request, Response } from 'express';

export default function checkToken(cfg: ServerConfig) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access Denied' });
    try {
      // THINK: if you need to process any of the claims, then assign the result of the token
      // to a variable and work from there.
      jwt.verify(token, cfg.jwtSecret);
      next();
    } catch (err) {
      res.status(401).json({ error: 'Access Denied' });
    }
  };
}
