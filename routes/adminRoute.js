const express=require("express");
const { loginUserController, registerUserController } = require("../controllers/adminController");
const usersRoute=express.Router();


// POST/api/v1/users/register
// usersRoute.post("/register",async(req,res)=>{
//       try {
//           res.json({msg:"Register route"})
//       } catch (error) {
//           res.json(error);
//       }
// });

// POST/api/v1/users/login
usersRoute.post("/login",loginUserController);
usersRoute.post("/register",registerUserController);
 


module.exports=usersRoute;