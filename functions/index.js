/**
 * This file is the starting point of execution of this Cloud Function (please refer to line 15 of package.json). To better
 * understand certain things, check out the README.md file then check out my portfolio website https://engels-immanuel.web.app
 */

const functions = require("firebase-functions") // Firebase Cloud Functions
const admin = require('./utils/configs/firebase-admin') // Check out utils/configs/firebase-admin.js for more
const sendEmail = require('./utils/send-email') // Check out utils/send-email.js for more
const sendMessage = require('./utils/send-message') // Check out utils/send-message.js for more
const sendNotification = require('./utils/send-notification') // Check out utils/send-notification.js for more

/* Here, /Users/{userId}/Messages/{messageId} is the path i want to watch for oncreate events in the 'Messages' collection.
* The wildcards {userId} and {messageId} implies that i want to watch every subcollection in 'Users' for this oncreate event
* Check out the Cloud Functions for Firebase docs to learn more about wildcards */
exports.evil = functions.firestore.document('Users/{userId}/Messages/{messageId}').onCreate(async (snap, context) => {
    const senderEmail = snap.data()['email']
    const myEmail = (await admin.firestore().doc(`Users/${process.env.ENGELS_ID}`).get()).data()['email']
    const senderPhone = snap.data()['phone']

    // Send the email or catch the error
    try {
        await sendEmail(senderEmail, '', '') // Send email feedback to the user that contacted me first
        functions.logger.log('From index.js ::', 'Email sent to visitor')
        await sendEmail(myEmail, '', '') // Then send me an email informing me that a visitor contacted me
        functions.logger.log('From index.js ::', 'Email sent to me')

        // Check if the user wants to 'hire me'. I am still contemplating whether to implement this functionality
        // if (snap.data()['category'] === 'hire me') {
        //     await sendMessage(senderPhone) // Send text message feedback only to a user that wants to 'hire me'
        //     functions.logger.log('From index.js ::', 'Message sent')
        // }

        await sendNotification('', '') // Instruct Firebase Cloud Messaging to send the client a notification
        functions.logger.log('From index.js ::', 'Notification sent')

    } catch (e) {
        functions.logger.error('From index.js ::', 'Email, message or notification failed to send ::', e)
    }
})
