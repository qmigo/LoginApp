const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Enter a username'],
        unique: [true, 'Username exists']
    },
    password:{
        type: String,
        required: [true, 'Enter a password'],
        minlength: 4
    },
    email:
    {
        type: String,
        required: [true, 'Provide an email'],
        unique: [true, 'email already registered with us']
    },
    status: 
    {
        type: Boolean,
        default: false
    },
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: Number},
    address: {type: String},
    profile: {type: String}
})

UserSchema.pre('save',async function(){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (password)
{
    const result = await bcryptjs.compare(password, this.password)
    return result
}

UserSchema.methods.createJWT = function ()
{
    return jsonwebtoken.sign({
        userId: this._id,
        username: this.username,
    },'secret',{expiresIn:'30d'})

}
module.exports = mongoose.model('User',UserSchema)