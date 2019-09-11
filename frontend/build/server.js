const path = require('path')
const express = require('express')

// Change PORT here
const PORT = 80

const app = express()

// Static directory for root
app.use(express.static(__dirname))

// Add other static directories here
// app.use('/GFS', express.static(path.join(__dirname, '../GFS')))

// All other requests goes to index.html (routes)
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// Starts express server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
