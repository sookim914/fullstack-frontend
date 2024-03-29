const store = require('./../store')

const onStart = function (event) {
  event.preventDefault()
  const timerId = $(event.target).data('id')
  const timerElement = $('#' + timerId)
  const buttonElement = $('[data-id =' + timerId + ']')
  $('.start-button').attr('disabled', 'disabled')
  buttonElement.find('.pause-button').removeAttr('disabled')
  buttonElement.find('.reset-button').removeAttr('disabled')
  // filter the array to get the object that matches the value of id
  const newArray = (store.timers.timers).filter(obj => {
    return obj['id'] === timerId
  })
  // parseInt(newArray[0]['uses'] += 1)
  // convert minutes into seconds and add to seconds
  let seconds = newArray[0]['minutes'] * 60 + newArray[0]['seconds']
  // if seconds is more than 0, it will run setInterval () every 1 milliseconds
  store.interval = setInterval(function () {
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
      if (minutes === 0 && displaySeconds === 1) {
        $('.container').addClass('animated', 'bounce')
      }
      // display seconds and minutes
      timerElement.find('.minutes').html(minutes)
      timerElement.find('.seconds').html(displaySeconds)
      store.instantMinutes = minutes
      store.instantSeconds = displaySeconds
    }
  }, 1000)
}

module.exports = {
  onStart
}
