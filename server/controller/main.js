const User = require('../model/User')
const CustomAPIError = require('../errors/custom-error')
const otpGenerator = require('otp-generator')
const bcryptjs = require('bcryptjs')
const registerMail= require('./mailer')

const verifyUser = async(req, res)=>{

}
const getAllUser = async(req, res)=>{
    const users = await User.find({})
    return res.json({nbHits:users.length, users})
}

const deleteAllUser = async(req, res)=>{
    await User.deleteMany({})
    res.json('Success')
}

const register = async(req, res)=>{
    
    const user = await User.create(req.body)
    const {password, ...payload} = Object.assign("",user.toJSON())
    
    const result = await registerMail(payload)
    
    return res.status(201).json({msg: 'New User Added Successfully'})    

}

const validateUser = async(req, res)=>{
    
    const {userId} = req.query
    const user = await User.findByIdAndUpdate({_id:userId}, {status: true}, {
        runValidators: true,
        new: true
    })
    if(!user)
    res.status(400).json({ msg:"User ID tampered" })
    res.json(user)
}

const login = async(req, res)=>{
    
    const {username, password} = req.body
    if(!username || !password)
    throw new CustomAPIError('Username and password cannot be empty',400)

    const user = await User.findOne({ username })
    if(!user)
    throw new CustomAPIError('User does not exists',401)

    if(user.status === false)
    throw new CustomAPIError('User not authorized, check your mail',403)

    const isPassword = await user.comparePassword(password)

    if(isPassword===false)
    throw new CustomAPIError('Password Incorrect', 401)

    const token  = user.createJWT()
    res.status(200).json({ msg:'Login Success', username, token })

}

const getUser = async(req, res)=>{
    
    const { username } = req.params

    const user = await User.findOne({ username })
    if(!user)
    throw new CustomAPIError('User not exists',404)

    // removes password field
    const {password, ...rest} = Object.assign("",user.toJSON())
    res.status(200).json(rest)

}

const updateUser = async(req, res)=>{
    
    const user = await User.findByIdAndUpdate({ _id: req.user.userId }, req.body, {
        runValidators:true,
        new:true
    })

    if(!user)
    throw new CustomAPIError('User not exist',400)
    res.status(200).json(user)
}

const generateOTP = async(req, res)=>{
    req.app.locals.OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets:false, specialChars: false })   
    return res.status(200).json({code: req.app.locals.OTP})
}

const verifyOTP = async(req, res)=>{
    const {code} = req.query
    if(parseInt(code) === parseInt(req.app.locals.OTP))
    {
        req.app.locals.OTP = null
        req.app.locals.resetSession = true

        return res.json({msg:'Success'})
    }
    res.json({msg:'Invalid Otp'})
}

const createResetSession = async(req, res)=>{
    if(req.app.locals.resetSession)
    {
        req.app.locals.resetSession = false
        return res.status(200).json({msg: "Session started"})
    }
    res.status(400).json({ msg:"Session Expired" })
}

const resetPassword = async(req, res)=>{
    if(!req.app.locals.resetSession)
    throw new CustomAPIError('Session Expired',440)

    const { username, password } = req.body
    if(!username || !password)
    throw new CustomAPIError('username and password are must', 401)

    const salt = await bcryptjs.genSalt()
    const hashPassword = await bcryptjs.hash(password, salt)
    const user = await User.findOneAndUpdate({username}, {password:hashPassword}, {
        runValidators: true,
        new: true
    })
    
    req.app.locals.resetSession = false
    res.status(200).json("Updated succesfully")
}

module.exports = {
    verifyUser,
    register,
    login,
    getUser,
    generateOTP,
    verifyOTP,
    updateUser,
    createResetSession,
    resetPassword,
    deleteAllUser,
    getAllUser,
    validateUser
}