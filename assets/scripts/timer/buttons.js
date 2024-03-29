const store = require('./../store')

const onResume = (event) => {
  event.preventDefault()
  // clear all the interval that has been stored
  clearInterval(store.interval)
  // get the id of the timer
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  const buttonElement = $('[data-id =' + timerId + ']')
  // hide resume button once clicked
  buttonElement.find('.resume-button').hide()
  // disable start button once resume is clicked
  $('.start-button').attr('disabled', 'disabled')
  // turn all the minutes and seconds into seconds
  let seconds = parseInt(store.instantMinutes) * 60 + parseInt(store.instantSeconds)
  store.resumeInterval = setInterval(function () {
    if (seconds > 0) {
      seconds--
      let minutes = Math.floor(seconds / 60)
      let displaySeconds = seconds % 60
      // if seconds & minutes are less than 10, add 0 in front of the number
      if (displaySeconds < 10) {
        displaySeconds = `0${displaySeconds}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      store.instantMinutes = minutes
      store.instantSeconds = displaySeconds
      timerElement.find('.minutes').html(minutes)
      timerElement.find('.seconds').html(displaySeconds)
    }
  }, 1000)
  buttonElement.find('.pause-button').show()
}

const onReset = (event) => {
  event.preventDefault()
  clearInterval(store.interval)
  clearInterval(store.resumeInterval)
  // show the pause button
  $('.pause-button').show()
  // hide resume button and show the pause button instead
  $('.resume-button').hide()
  $('.pause-button').attr('disabled', 'disabled')
  $('.start-button').removeAttr('disabled')
  const id = $(event.target).data('id')
  const timerElement = $('#' + id)
  // filter the array to get the object that matches the value of id
  const newArray = (store.timers.timers).filter(obj => {
    return obj['id'] === id
  })
  // get the value of minutes and seconds from the data and set them as variables
  let seconds = newArray[0]['seconds']
  let minutes = newArray[0]['minutes']
  // if the number length is 1, put 0 in front of it
  if (seconds !== null && seconds.toString().length === 1) {
    seconds = `0${seconds}`
    timerElement.find('.seconds').html(seconds)
    // if there's no seconds, it is 00 (on the timer)
  } else if (seconds === null) {
    seconds = '00'
    timerElement.find('.seconds').html(seconds)
  }
  // if the 'minutes' is a single digit, put 0 in front of the number
  if (minutes !== null && minutes.toString().length === 1) {
    minutes = `0${minutes}`
    timerElement.find('.minutes').html(minutes)
    // if there's no minutes, it is 00 (on the timer)
  } else if (minutes === null) {
    minutes = '00'
    timerElement.find('.minutes').html(minutes)
  }
  timerElement.find('.minutes').html(minutes)
  timerElement.find('.seconds').html(seconds)
}

const onPause = (event) => {
  event.preventDefault()
  clearInterval(store.interval)
  clearInterval(store.resumeInterval)
  // start button is disabled
  $('.start-button').attr('disabled', 'disabled')
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  const buttonElement = $('[data-id =' + timerId + ']')
  timerElement.find('.minutes').html(store.instantMinutes)
  timerElement.find('.seconds').html(store.instantSeconds)
  buttonElement.find('.pause-button').hide()
  buttonElement.find('.resume-button').show()
}
module.exports = {
  onResume,
  onPause,
  onReset
}
