//file auth untuk mendapatkan token dari jsonwebtoken
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeSequelize"
module.exports = function (req, res, next) {
    //token dikirim melalui header
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    if(token == null){
       res.status(401).json([message= "tidak dikenali"])
    } else {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if(err){
                res.status(401)
                res.json({
                    message: "Invalid token"
                })
            } else {
                next()
            }
        })
    }
}