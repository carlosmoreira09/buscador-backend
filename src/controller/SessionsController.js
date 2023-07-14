import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";


class SessionsController { 
    async create(req, res) { 
        const { usuario, password } = req.body;
        const user = await User.findOne({ usuario });

        if(!user) { 
            return res.status(401).json({error: "User/Password Invalid"});
        }
         if(!checkPassword(password, user.password)) {
             return res.status(401).json({error: "User/Password invalid"});
         }

        const { id } = user;

        return res.json({ 
            user: { 
                id,
                usuario
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

export default new SessionsController();