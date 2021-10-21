const functions = require("firebase-functions") // Firebase Cloud Functions
const admin = require('./utils/firebase-admin') // Check out utils/firebase-admin.js for more
const sendEmail = require('./utils/send-email') // Check out utils/send-email.js for more
const sendMessage = require('./utils/send-message') // Check out utils/send-message.js for more
const sendNotification = require('./utils/send-notification') // Check out utils/send-notification.js for more

/* Here, /Users/{userId}/Messages/{messageId} is the path i want to watch for oncreate events in the 'Messages' collection
* the wildcards {userId} and {messageId} implies that i want to watch every subcollection in 'Users' for this oncreate event
* Check out the Cloud Fucntions for Firebase docs to learn more about wildcards */
exports.evil = functions.firestore.document('Users/{userId}/Messages/{messageId}').onCreate((snap, context) => {
    const senderEmail = snap.data()['email']
    const senderPhone = snap.data()['phone']

    // Send the email or catch the error
    try {
        await sendEmail(senderEmail, '', '')
        functions.logger.log('From index.js ::', 'Email sent')
    } catch (e) {
        functions.logger.error('From index.js ::', 'Email failed to send ::', e)
    } finally {}
})
