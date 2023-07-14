import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController { 
    async index(req,res) { 
        try {

            const  {user_id } = req.params;
            const user = await User.findById(id);
            if(!user) { 
                return res.status(400).json();
            }

            const repositories = await Repository.find({user_id});

            return res.json(repositories);

        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })
        }
    }

    async create(req,res) { 
        try {
            const { user_id } = req.params;
            const { name, url} = req.body;
            
            const user = await User.findById(user_id);
            
            if(!user) {
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user_id,
                name
            })

            if(repository) { 
                return res
                .status(422)
                .json({message: `Esse Repositorio ${name} ja existe`})
            }
            
            const newRepository = await Repository.create({ 
                name: name,
                url,
                userId: user_id
                
            })

            return res.status(200).json(newRepository);

        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })
        }
    }
    
    async destroy(req,res) { 
        try { 

            const { user_id } = req.params;
            const user = await User.findById(user_id);
            
            if(!user) {
                return res.status(404).json();
            }
            
            const repository = await Repository.findById(user_id);
            if(!repository) { 
                return res.status(404).json({message: "Repositorio não encontrado"});
            }

            await Repository.deleteOne();

            return res.status(200).json();

        } catch(err) { 
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error." })
        }
    }
}

export default new RepositoriesController();