/**
 * Oops! not what you thought it'd be right? :-) Anyways, this file contains variables that reference
 * environment configuration values. Please create an account on SendGrid to generate your SendGrid API key
 */

const functions = require('firebase-functions')

const sendgridApiKey = functions.config().sendgrid.api_key
const engelsId = functions.config().engels.id

module.exports = {
    sendgridApiKey,
    engelsId
}