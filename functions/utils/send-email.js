/**
 * This file contains logic to send an email feedback to the user that sends me a message in the 'Get in Touch'
 * or 'Hire Me' section of my portfolio. Check out my portfolio website https://engels-immanuel.web.app
 */

const functions = require("firebase-functions") // Firebase Cloud Functions
const sgMail = require('@sendgrid/mail') // SendGrid
const dotenv = require('dotenv') // Helper package for setting up environment variables

// Init stuff here
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY) // Please create an account on SendGrid to generate your SendGrid API key

const sendEmail = async (to, subject, text) => {
    const message = {
        to,
        from: 'engelmmanuel@gmail.com',  // TODO: Need to setup a custom domain for this
        subject,
        text
    }

    // Now send the email or catch the error
    try {
        await sgMail.send(message)
        functions.logger.log('From send-email.js ::', 'Email sent')
    } catch (e) {
        functions.logger.error('From send-email.js ::', 'Email failed to send ::', e)
    }
}

// sendEmail('engelsimmanuel@outlook.com', 'Test message subject', 'Test message body')

module.exports = sendEmail