/** 
 * This file contains logic to send a notification feedback to the client whenever any user sends me a message in the
 * 'Get in Touch' or 'Hire Me' section of my portfolio. Check out my portfolio website https://engels-immanuel.web.app
 */

const functions = require("firebase-functions") // Firebase Cloud Functions
const admin = require('./firebase-admin') // Check out firebase-admin.js for more

const sendNotification = () => {
    const token = ''
    const notificationPayload = {
        data: {},
        token
    }
    // const notificationPayload = {
    //     notification: {
    //         title: '',
    //         body: ''
    //     },
    //     token
    // }

    try {
        await admin.messaging().sendToDevice(token, notificationPayload)
        functions.logger.log('From send-notification.js ::', 'Notification sent')
    } catch (e) {
        functions.logger.error('From send-notification.js ::', 'Notification failed to send ::', e)
    }
}

module.exports = sendNotification