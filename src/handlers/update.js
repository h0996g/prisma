
const prisma = require('../db')
exports.getUpdates = async (req, res) => {
    try {
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
    } catch (error) {
        console.lores.status(500).json({ error: error.message }); g(e)

    }

}
exports.getOneUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const update = await prisma.update.findUnique({
            where: {
                id: id
            }
        })

        res.json({ data: update })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.createUpdate = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.updateUpdate = async (req, res) => {
    try {
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

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
exports.deleteUpdate = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}