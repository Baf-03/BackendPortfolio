const jwt = require("jsonwebtoken");
const SignUpModel = require("../model/SignUpSchema");

const SignUpController = async (req, res) => {
    try {
        const { firstName, lastName, email ,password} = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.json({
                status: false,
                message: "All fields are required",
                data: null
            });
            return;
        }
        
        const checkEmailExist = await SignUpModel.findOne({ email }); // await here
        
        if (checkEmailExist) {
            res.json({
                status: false,
                message: "Email already taken. Please try again with a different email.",
                data: null
            });
            return;
        }
        
        const objToSend = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };

        const saveUser = await SignUpModel.create(objToSend);
        
        res.json({
            status: true,
            message: "Sign up successful",
            data: saveUser
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message,
            data: null
        });
    }
};

const LoginUpController = async(req,res)=>{
    try{
        const {email,password} = req.body
        console.log
        if(!email || !password){
            res.json({
                status:false,
                message:"all fields are required",
                data:null
            })
            return
        }
      
        const userExist = await SignUpModel.findOne({email})
        console.log(userExist)
        if(!userExist){
            res.json({
                status:false,
                message:"Email is incorrect,",
                data:null
            })
            return
        }
        if(!userExist.password==password){
            res.json({
                status:false,
                message:"Either password or email is incorrect",
                data:null
            })
            return
        }
        const token = jwt.sign({ email: userExist.email }, "PRIVATEKEY",{expiresIn:'85900s'})

        res.json({
            status:true,
            message:"Login SuccessFull",
            data:userExist,
            token
        })
    }
    catch(err){
        res.json({
            status:false,
            message:err.message,
            data:null
        })
    }
   
}

module.exports={
    SignUpController,LoginUpController
}