#! /usr/bin/env node
var express = require('express')
var cors = require('cors')
var app = express()
const {
  headerCase,
} = require("change-case");
const bodyParser = require("body-parser");


var port = process.argv[2] || 1010

app.use(cors())
app.use(bodyParser.text({
  type: '*/*',
  limit: '4kb',
}))
app.use(function (request, response) {
  console.log(`############### ${new Date()} ###############`)
  let contentType = request.headers["content-type"];
  console.log(`[${request.method}] ${request.url} (${contentType})`)

  Object.keys(request.headers).forEach(key=>{
    console.log(`${headerCase(key)}: ${request.headers[key]}`)
  })
  if(request.body) {
    console.log('\n## Body')
    console.log(request.body)
  } else {
    console.log('\n## Unsupported body')
  }
  response.end();
})

app.listen(port, function () {
  console.log('\n--------- server listening at ' + port + ' ---------')
})
