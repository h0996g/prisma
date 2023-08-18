const prisma = require('../db')
exports.getProducts = async (req, res) => {
    const product = await prisma.user.findMany({
        include: {
            products: true
        }


    })
    res.json({ data: product })
}
exports.getMyProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
        , include: {
            products: true
        }
    })
    res.json({ data: user.products })
}
exports.getOneProduct = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id: id,
            belongsToId: req.user.id

        }
    })
    res, json({ data: product })
}
exports.creatProduct = async (req, res) => {
    const id = req.params.id

    const product = await prisma.product.create({
        data: {
            belongsToId: req.user.id,
            name: req.body.name
        }
    })
    res.json({ data: product })
}
exports.updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,

        },
        data: {
            name: req.body.name
        }
    })
    res.json({ data: updated })
}
exports.deletProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({ data: deleted })
}