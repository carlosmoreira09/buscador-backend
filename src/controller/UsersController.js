import User from "../models/User";
import { createPasswordHash } from "../services/auth";

class HelloController { 
   
    async index(req,res) { 

        try { 
            const users = await User.find();
            return res.json(users);

        } catch (err) { 
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })

        }
        
    }

    async list(req,res) { 
        try { 
            const { id } = req.params;

            const user = await User.findById(id);

            if(!user) { 
                return res.status(404).json();
            }
            return res.json(user);

        } catch(err){ 
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })

        }
        
    }

    async create(req,res) { 
        try {
            const { usuario, password } = req.body;
    
            const user = await User.findOne({ usuario });
            if(user) { 
                return res
                .status(422)
                .json({
                     message: `User ${usuario} já existe.`
                     });
            }
            
            //Criptografando a senha
           const encryptedPassword = await createPasswordHash(password);

            const newUser = await User.create({ 
                 usuario,
                 password: encryptedPassword
                });
            
            return res.status(200).json(newUser);

        } catch(err) { 
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })
        }
    }
    
    async update(req,res) { 
     
        try { 
            const { id } = req.params;
            const { usuario, password} = req.body;

            const user = await User.findById(id);

            if(!user) { 
                return res.status(404).json();
            }
            
            const encryptedPassword = await createPasswordHash(password);
            
            await user.updateOne({
                usuario,
                password: encryptedPassword
            })
            
            return res.status(200).json({ message: "Usuario atualizado"});

        } catch(err) { 
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })
        }
        
    }
    
    async destroy(req,res) { 
        try {
            const { id } = req.params;
            
            const user = await User.findById(id);

            if(!user) { 
                return res.status(404).json();
            }

            await user.deleteOne();

            return res.status(200).json({ message: "Usuario deletado"});
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })
                
        }
    }

}

export default new HelloController();