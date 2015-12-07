var Rx = require('rx')
var format = require('chalk')
var figures = require('figures')
var formatFailures = require('@untap/failures')
var formatResults = require('@untap/results')
var exitOnFailure = require('@untap/exit')

module.exports = function (input$) {

  return Rx.Observable
    .merge(
      tapFormatDot(input$),
      formatFailures(input$),
      formatResults(input$),
      exitOnFailure(input$)
    )
}

function tapFormatDot (input$) {

  var output$ = new Rx.Subject()

  process.stdout.write(pad())

  input$.passingAssertions$
    .forEach(function () {

      process.stdout.write(format.green('.'))
    })

  input$.failingAssertions$
    .forEach(function (num) {

      process.stdout.write(' ' + format.red(figures.cross) + ' ')
    })

  input$.assertions$
    .subscribeOnCompleted(function () {

      process.stdout.write('\n\n')
    })

  return output$
}

function pad (str) {

  str = str || ''
  return '  ' + str
}
