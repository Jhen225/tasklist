const bcrypt = require('bcryptjs');
const ROUNDS = 10;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
  firstName: {type:String, required:false},
  lastName: {type:String, required:false},
  username: {type:String, required:true},
  password: {type:String, required:true}
});

userSchema.pre('save', function(done){
  let user = this;
  let password = user.password;
  bcrypt.genSalt(ROUNDS)
  .then(salt => bcrypt.hash(password,salt))
  .then(hash => {
    user.password = hash;
    done();
  });
});

let User = module.exports = mongoose.model('User', userSchema);
