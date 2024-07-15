const mongoose= require("mongoose");

// user Schema

const AdminUserSchema = new mongoose.Schema({
  fullname:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },

  hasCreatedAccount:{
    type:Boolean,
    default:false,

  },

  

},{
  timestamps:true,
  toJSON:{virtuals:true},
});

// Create the AdminUser model based on schema
const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

module.exports = AdminUser;