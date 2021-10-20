const functions = require("firebase-functions");
const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const message = {
    to: 'engelmmanuel@gmail.com',
    from: 'engelmmanuel@gmail.com',
    subject: 'Test',
    text: 'Test email'
}

sgMail
    .send(message)
    .then(() => {
        console.log('Message sent')
    })
    .catch((error) => {
        console.log(error)
    })
