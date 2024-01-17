const {Admin} = require("./database")
const jwt = require("jsonwebtoken")
const jwtPassword = "hehe"

async function authenticateAdmin(req,res,next){
    const token = req.headers.authorization
    const data = jwt.verify(token,jwtPassword)
    const check = await Admin.findOne({
        username : data.username,
    })
    if(check){
        next()
    }
    else{
        res.status(403).json({
            msg : "Invalid User"
        })
    }
}

module.exports = authenticateAdmin