'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events')
const timerEvents = require('./timer/events')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#hide-before-sign-in').hide()
  $('.description').modal('show')
  // your JS code goes here
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#sign-out').on('click', () => {
    $('.collapse').collapse('hide')
  })
  $('#timer').on('submit', timerEvents.onCreate)
  timerEvents.addHandlers()
  // your JS code goes here
})
