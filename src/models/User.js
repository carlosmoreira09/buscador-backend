import mongoose from  "mongoose";

const userSchema = new mongoose.Schema( 
    {
        usuario: { 
            type: String,
            required: true,
            index:{ 
                unique:true
            }
        },
        password: { 
            type: String,
            required:true
        }
    }, 
        {
            timestamps: true
        }
    
);

export default new mongoose.model('User', userSchema);