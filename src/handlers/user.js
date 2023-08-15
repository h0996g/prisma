const prisma = require('../db')
const { hashPasswords, creatJWT, comparePasswords } = require('../modules/auth')
exports.createNewUser = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username
                , password: await hashPasswords(req.body.password)
            }
        })
        const token = creatJWT(user)
        res.json({ token: token })
    } catch (e) {
        console.log(e)
        res.json({ message: 'deja exist' })
    }


}
exports.signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }

    })
    const isValid = await comparePasswords(req.body.password, user.password)
    if (!isValid) {
        res.json(401)
        res.json({ message: 'nope' })
        return
    }
    const token = creatJWT(user)
    res.json({ token: token })
}