const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))