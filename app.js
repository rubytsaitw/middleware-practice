const express = require('express')
const app = express()
const PORT = 5000

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

let demoLogger = (req, res, next) => {
  let currentDateTime = new Date()
  let formattedDate =
    currentDateTime.getFullYear() +
    '-' +
    currentDateTime.getMonth() +
    '-' +
    currentDateTime.getDate() +
    ' ' +
    currentDateTime.getHours() +
    '-' +
    currentDateTime.getMinutes() +
    '-' +
    currentDateTime.getSeconds()
  let method = req.method
  let url = req.url
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  console.log(`${formattedDate} |  ${method} from ${url} | total time: ${durationInMilliseconds.toLocaleString()} ms`)
  next()
}

app.use(demoLogger)


app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(PORT, () => {
  console.log(`App is running on  port ${PORT}`)
})

// Reference
// https://codesource.io/creating-a-logging-middleware-in-expressjs/