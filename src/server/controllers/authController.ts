import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
import User from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    //si exist user
    if (user) {
      return res.status(400).json({ msg: "L'email est déjà utilisé" });
    }
    user = new User({
      username,
      email,
      password,
    });
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: 3600 },
      (err: any, token: any) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de register");
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //email not found
    if (!user) {
      return res.status(401).json({ msg: "Utilisateur non trouvé" });
    }
    const isMatch = await user.comparePassword(password);
    //password is not correct
    if (!isMatch) {
      return res.status(401).json({ msg: "Mot de passe incorrect" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: 3600 },
      (err: any, token: any) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de login");
  }
};
