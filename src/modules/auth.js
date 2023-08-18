// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
exports.comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}
exports.hashPasswords = (password) => {
    return bcrypt.hash(password, 5)
}



exports.creatJWT = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
    return token
}
exports.protect = async (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401)
        res.json({ message: 'Not Autorized bearer' })
        return
    }
    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401)
        res.json({ message: 'Not Autorized token' })
        return
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ message: 'Not Autorized catch' })
        return
    }
}