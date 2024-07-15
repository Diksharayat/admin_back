const bcrypt=require("bcrypt");
const AdminUser = require("../models/User");






// Register
const registerUserController=async(req,res,next)=>{
  const {fullname,password,email}=req.body;

     try{
          
     // Check if the email exist
     const userFound=await AdminUser.findOne({email});
     if (userFound) {
         return next(appErr("user already exists",400));
     };
  
    
     // hash password
       const salt=await bcrypt.genSalt(10);
       const hashedPassword= await bcrypt.hash(password,salt);
       
     // create user
     const user=await AdminUser.create({
          fullname,
          email,
          password: hashedPassword,
     });

       res.json({
          status:"success",
          fullname:user.fullname,
          email:user.email,
          id: user._id
     })
  }catch(error){
       next(new Error(error));
  }
}

// login
const loginUserController=async(req, res,next)=>{
  const {email,password} = req.body;
     try{
     // check if email exist
     const userFound= await User.findOne({email});
     if(!userFound) return next(new AppErr("invalid login credentials",400))
     // check for password validity'
      const isPasswordMatch= await bcrypt.compare(password,userFound.password)
      if(!isPasswordMatch) return next(new AppErr("invalid login credentials",400))
     
     
      res.json({
     status:'success',
     fullname:userFound.fullname,
     id:  userFound._id,
     token:generateToken(userFound._id),
     });
  }catch(error){
     next(new AppErr(error.message,500));
  }
}





module.exports={
  registerUserController,
  loginUserController,
}
