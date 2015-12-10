#!/usr/bin/env node

var parser = require('@tap-format/parser')
var formatAsDot = require('../')

var input$ = parser.observeStream(process.stdin)

formatAsDot(input$).forEach(console.log.bind(console))

