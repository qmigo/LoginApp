const nodemailer = require('nodemailer')
const mailGen = require('mailgen')
const CustomAPIError = require('../errors/custom-error')


let nodeConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.NODEMAILER_USER, // generated gmail user
      pass: process.env.NODEMAILER_PASS, // generated gmail password
    },
}

let transporter = nodemailer.createTransport( nodeConfig )

var mailGenerator = new mailGen({
    theme: 'default',
    product: {
        name: 'Ankur Mishra',
        link: 'https://www.linkedin.com/in/ankurmishra031100/',
        logo: 'https://qmigo.github.io/Ankur.github.io/logo.png'
    }
})

const registerMail = async (payload)=>{
    const { username, email:reciepent, _id } = payload
    const userId = String(_id)
    console.log(username,reciepent, userId)
    var emailWrapper = {
        body: {
            name: username,
            intro: 'Welcome to Maslang! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Maslang, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${process.env.URL}/validateUser?userId=${userId}`
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = mailGenerator.generate(emailWrapper)

    let message = {
        from : process.env.FROM,
        to: reciepent,
        subject : "Signup Successful",
        html : emailBody
    }
    try {
    await transporter.sendMail(message)
    } catch (error) {
        throw new CustomAPIError('Mail could not be sent',400)
    }
}

module.exports = registerMail