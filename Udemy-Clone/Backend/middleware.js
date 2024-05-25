const {Users, Admin} = require("./database")

async function tokenCheckAdmin(req,res,next){
    const token = req.headers.authorization
    const check = await Admin.findOne({
        token : token
    })
    if(check){
        next()
    }
    else{
        res.status(401).json({
            msg : "Invalid credentials"
        })
    }
}

async function tokenCheckUser(req,res,next){
    const token = req.headers.authorisation
    const check = await Users.findOne({
        token : token
    })
    if(check){
        next()
    }
    else{
        res.status(401).json({
            msg : "Invalid Credentials"
        })
    }
}

module.exports = {
    tokenCheckAdmin,
    tokenCheckUser
}