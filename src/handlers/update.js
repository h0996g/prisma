
const prisma = require('../db')
exports.getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        }, include: {
            updates: true
        }

    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
    res.json({ data: updates })
}
exports.getOneUpdate = async (req, res) => {
    const id = req.params.id
    const update = await prisma.update.findUnique({
        where: {
            id: id
        }
    })

    res.json({ data: update })
}

exports.createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id_belongsToId: {
                id: req.body.productId,
                belongsToId: req.user.id
            }
        }
    })
    if (!product) {
        return res.json({ message: "Nope" })
    }
    const update = await prisma.update.create({
        data: req.body
    })
    res.json({ data: update })
}

exports.updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        }
        , include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)
    if (!match) {
        return res.json({ message: "nope" })
    }
    const updated = await prisma.update.update({
        where: {
            id: req.params.id

        }, data: req.body


    })
    res.json({
        data: updated
    })

}
exports.deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        }
        , include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)
    if (!match) {
        return res.json({ message: "nope" })
    }
    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deleted })
}