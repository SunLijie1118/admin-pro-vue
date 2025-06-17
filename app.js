const express = require('express')
const app = express()
const port = 8000


const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(fs.readFile)

// 获取 json 数据
const getFileData = async (fileName) => {
  const filePath = path.join(__dirname, `./mock/${fileName}.json`)
  const data = await readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

app.get('/api/currentUser', async (req, res) => {
  const currentUser = await getFileData('currentUser');
  res.send(currentUser)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})