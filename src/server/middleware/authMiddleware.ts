import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  //recupere le Bearer token
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    (req as any).user = decoded; // Ajout des informations de l'utilisateur à la requête
    next();
  } catch (error) {
    res.status(403).json({ msg: "Token invalid" });
  }
};
