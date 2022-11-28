const express = require('express')
const app = express()
const cors = require("cors")
// const db = require("./models")
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.static(__dirname))

//router user
const user = require('./routes/user')
app.use("/user", user)

//router member
const member = require('./routes/member')
app.use("/member/", member)

//router outlet
const outlet = require('./routes/outlet')
app.use("/outlet", outlet)

//router paket
const paket = require('./routes/paket')
app.use("/paket", paket)

//router transaksi
const transaksi = require('./routes/transaksi')
app.use("/transaksi", transaksi)


app.listen(port, () => console.log(`App running ${port}`))