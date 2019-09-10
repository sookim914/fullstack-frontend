const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
const timer = require('./timer')

const onGetTimers = event => {
  // event.preventDefault()
  api.getTimers()
    .then(ui.getTimersSuccess)
    .catch(ui.onFailure)
}

const onCreate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  store.timer = data
  api.create(data)
    .then(() => onGetTimers(event))
    .then(ui.onCreateSuccess)
    .catch(ui.onFailure)
}

const onDelete = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  console.log(id)
  api.deleteTimer(id)
    .then(() => onGetTimers(event))
    .then(ui.onDeleteSuccess)
    .catch(ui.onFailure)
}

const onUpdate = (event) => {
  event.preventDefault()
  const updateId = $(event.target).data('id')
  const data = getFormFields(event.target)
  $('#message3').text('timer updated!')
  setTimeout(() => {
    $('#message3')
      .text('')
  }, 3000)
  api.updateTimer(data, updateId)
    .then(() => onGetTimers(event))
    .catch(ui.onFailure)
}

const addHandlers = () => {
  $('#pomodoro-app').on('click', '.delete-button', onDelete)
  $('#pomodoro-app').on('submit', '.updateTimer', onUpdate)
  $('#pomodoro-app').on('click', '.start-button', timer.onStart)
}

module.exports = {
  onCreate,
  onDelete,
  addHandlers,
  onGetTimers
}
