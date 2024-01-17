const {Admin} = require("./database")

async function authenticateAdmin(req,res,next){
    const username = req.headers.username
    const password = req.headers.password
    const check = await Admin.findOne({
        username : username,
        password : password
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