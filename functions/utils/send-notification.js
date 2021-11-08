/** 
 * This file contains logic to send a notification feedback to the client whenever any user sends me a message in the
 * 'Get in Touch' or 'Hire Me' section of my portfolio. Check out my portfolio website https://engels-immanuel.web.app
 */

const functions = require("firebase-functions") // Firebase Cloud Functions
const admin = require('./configs/firebase-admin') // Check out configs/firebase-admin.js for more
const { engelsId } = require('./configs/environment-variables') // Check out configs/environment-variables.js for more

const sendNotification = async (title, body) => {
    const token = (await admin.firestore().doc(`Users/${engelsId}`).get()).data()['device_token']
    const payload = {
        /**
         * I am not yet certain about the structure. Need to check Firebase Cloud Messaging docs again
         */
        message: {
            notification: {
                title,
                body
            },
            token
        }
    }

    try {
        await admin.messaging().send(payload)
        functions.logger.log('From send-notification.js ::', 'Notification sent')
    } catch (e) {
        functions.logger.error('From send-notification.js ::', 'Notification failed to send ::', e)
    }
}

// sendNotification('Test title', 'Test body')

module.exports = sendNotification