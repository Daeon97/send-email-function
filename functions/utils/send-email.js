/**
 * This file contains logic to send an email feedback to the user that sends me a message in the 'Get in Touch'
 * or 'Hire Me' section of my portfolio. Check out my portfolio website https://engels-immanuel.web.app
 */

const functions = require("firebase-functions") // Firebase Cloud Functions
const sgMail = require('@sendgrid/mail') // SendGrid
const { sendgridApiKey, engelsId } = require('./configs/environment-variables') // Check out configs/environment-variables.js for more
const admin = require('./configs/firebase-admin') // Check out configs/firebase-admin.js for more

sgMail.setApiKey(sendgridApiKey) // Please create an account on SendGrid to generate your SendGrid API key

const sendEmail = async (to, subject, text) => {
    const message = {
        to,
        from: (await admin.firestore().doc(`Users/${engelsId}`).get()).data()['email'],  // TODO: Need to setup a custom domain for from email
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