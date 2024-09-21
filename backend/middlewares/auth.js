const jwt = require('jsonwebtoken')

module.exports.authMiddleware = async(req, res,next) =>
{
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        return res.status(403).json({msg: 'Unauthenticated user!!'})

    }
    const token = authHeader.split(" ")[1]

    try
    {
        let decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken.userId
        next()

    }
    catch(err)
    {
        return res.json({Error : err})
    }
}