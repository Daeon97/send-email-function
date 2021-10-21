/** 
 * This file contains logic to send a notification feedback to the client whenever any user sends me a message in the
 * 'Get in Touch' or 'Hire Me' section of my portfolio. Check out my portfolio website https://engels-immanuel.web.app
 */

const functions = require("firebase-functions") // Firebase Cloud Functions
const admin = require('./configs/firebase-admin') // Check out configs/firebase-admin.js for more
const dotenv = require('dotenv') // Helper package for setting up environment variables

// Init dotenv
dotenv.config()

const sendNotification = async (title, body) => {
    const token = (await admin.firestore().doc(`Users/${process.env.ENGELS_ID}`).get()).data()['device_token']
    const payload = {
        notification: {
            title,
            body
        },
        token
    }

    try {
        await admin.messaging().send(payload)
        functions.logger.log('From send-notification.js ::', 'Notification sent')
    } catch (e) {
        functions.logger.error('From send-notification.js ::', 'Notification failed to send ::', e)
    }
}

module.exports = sendNotification