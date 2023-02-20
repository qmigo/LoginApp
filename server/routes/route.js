const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = express.Router()
const {
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
} = require('../controller/main')

// post routes
router.route('/').get(getAllUser)
router.route('/register').post(register)
router.route('/authenticate').post((req,res)=>res.end())
router.route('/login').post(login)

// get request
router.route('/user/:username').get(getUser)
router.route('/generateOTP').get(generateOTP)
router.route('/verifyOTP').get(verifyOTP)
router.route('/validateUser').get(validateUser)
router.route('/createResetSession').get(createResetSession)

// patch request
router.route('/updateUser').patch(authMiddleware ,updateUser)
router.route('/resetPassword').patch(resetPassword)

// delete 
router.route('/deleteAll').delete(deleteAllUser)

module.exports = router